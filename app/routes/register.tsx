import type { ActionFunction, LinksFunction, MetaFunction } from 'remix';
import {
  Link,
  useActionData,
  json,
  useSearchParams,
  redirect,
  Form,
  useTransition,
} from 'remix';
import stylesUrl from '../styles/register.css';
import { createUserSession } from '~/sessions';
import { signUp } from '~/utils/cognito.server';
import ValidationMessage from '~/components/ValidationMessage';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: 'Oddfather | Registration',
    description:
      "Create an Oddfather account to get access to today's best sports betting advice",
  };
};

function validateEmail(email: unknown) {
  // const regEx = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$");
  if (typeof email !== 'string') return `Email address error`;
  // const formattedEmail = email.toLowerCase();
  // if (!formattedEmail.match(regEx)) return `Please enter a valid email address`;
  if (email.length < 8) return `Email must be at least 8 characters`;
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 8) {
    return `Please choose a password with at least 8 characters`;
  }
}

function validateConfirmPassword(password: unknown, confirmPassword: unknown) {
  if (typeof confirmPassword !== 'string') {
    return `Error with password format`;
  }
  if (password !== confirmPassword) {
    return `Passwords do not match`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
    confirmPassword: string;
  };
};

const badRequest = (data: ActionData) => {
  json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const confirmPassword = form.get('confirm-password');
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }
  const fields = { email, password, confirmPassword };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const newUser = await signUp({ email, password });
  if (!newUser) {
    return badRequest({
      fields,
      formError: `Something went wrong creating the new user`,
    });
  }
  await createUserSession(newUser?.userSub, `/confirm-register`);
};

export default function RegisterRoute() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div className='container'>
      <div className='content'>
        <h1>Registration</h1>
        <Form
          method='post'
          aria-describedby={
            actionData?.formError ? 'form-error-message' : undefined
          }
        >
          <Input
            type='text'
            id='email-input'
            name='email'
            htmlFor='email'
            labelText='Email'
            defaultValue={actionData?.fields?.email}
            invalid={Boolean(actionData?.fieldErrors?.email)}
            describedBy={
              actionData?.fieldErrors?.email ? 'email-error' : undefined
            }
            isSubmitting={transition.state === 'submitting'}
            error={actionData?.fieldErrors?.email ?? undefined}
            style={{
              borderColor: actionData?.fieldErrors?.email ? 'red' : '',
            }}
          />
          <Input
            type='password'
            id='password-input'
            name='password'
            htmlFor='password'
            labelText='Password'
            defaultValue={actionData?.fields?.password}
            invalid={Boolean(actionData?.fieldErrors?.password)}
            describedBy={
              actionData?.fieldErrors?.password ? 'password-error' : undefined
            }
            isSubmitting={transition.state === 'submitting'}
            error={actionData?.fieldErrors?.password ?? undefined}
            style={{
              borderColor: actionData?.fieldErrors?.password ? 'red' : '',
            }}
          />
          <Input
            type='password'
            id='confirm-password-input'
            name='confirm-password'
            htmlFor='confirm-password-input'
            labelText='Confirm Password'
            defaultValue={actionData?.fieldErrors?.confirmPassword}
            invalid={Boolean(actionData?.fieldErrors?.confirmPassword)}
            describedBy={
              actionData?.fieldErrors?.confirmPassword
                ? 'confirm-password-error'
                : undefined
            }
            isSubmitting={transition.state === 'submitting'}
            error={actionData?.fieldErrors?.confirmPassword ?? undefined}
          />
          <div id='form-error-message'>
            {actionData?.formError ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.formError}
              />
            ) : null}
          </div>
          <Button
            transitionState={transition.state}
            callToAction='Sign Up'
            loadingText='Registering....'
          />
        </Form>
      </div>
    </div>
  );
}
