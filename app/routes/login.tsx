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
import stylesUrl from '../styles/login.css';
import { createUserSession } from '~/utils/session.server';
import { login } from '~/utils/cognito.server';
import ValidationMessage from '~/components/ValidationMessage';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: 'Oddfather | Login',
    description: "Login to get access to today's best betting odds",
  };
};

function validateEmail(email: unknown) {
  // const regEx = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$");
  if (typeof email !== 'string') return `Email address error`;
  // const formattedEmail = email.toLowerCase();
  // if (!formattedEmail.match(regEx)) return `Please enter a valid email address`;
  if (email.length < 8) return `Email address must be at least 8 characters`;
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 8) {
    return `Password must be at least 5 characters`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => {
  json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  if (typeof email !== 'string' || typeof password !== 'string') {
    return badRequest({ formError: `Username and Password must be strings` });
  }
  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(`Errors: ${JSON.stringify(fieldErrors, null, 2)}`);
    return badRequest({ fieldErrors, fields });
  }

  const user = await login({ email, password });
  if (!user) {
    return badRequest({
      fieldErrors,
      formError: `Email / Password combo is not correct`,
    });
  }
  const cookie = await request.headers.get('Cookie');
  console.log(`Cookie from LOGIN PAGE: ${cookie}`);
  const userId = await user.getIdToken().getJwtToken();
  return await createUserSession(userId, '/');
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  return (
    <div className='container'>
      <div className='content' data-light=''>
        <h1>Login</h1>
        <Form
          method='post'
          aria-describedby={
            actionData?.formError ? 'form-error-message' : undefined
          }
        >
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
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
            callToAction='Log In'
            loadingText='Authenticating....'
          />
        </Form>
      </div>
    </div>
  );
}
