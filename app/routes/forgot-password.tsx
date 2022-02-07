import type { ActionFunction } from 'remix';
import {
  redirect,
  Form,
  Link,
  useActionData,
  json,
  useSearchParams,
  useTransition,
} from 'remix';
import ValidationMessage from '~/components/ValidationMessage';
import { forgotPassword } from '~/utils/cognito.server';

function validateCode(code: unknown) {
  if (typeof code !== 'string' || code.length < 5) {
    return `Code must be at least 5 characters`;
  }
}

function validateNewPassword(newPassword: unknown) {
  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    return `Password must be at least 6 characters`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    code: string | undefined;
    newPassword: string | undefined;
  };
  fields?: {
    code: string;
    newPassword: string;
  };
};

const badRequest = (data: ActionData) => {
  json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const code = form.get('code');
  const newPassword = form.get('newPassword');
  const redirectTo = form.get('redirectTo') || '/games';
  if (
    typeof code !== 'string' ||
    typeof newPassword !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }
  const fields = { code, newPassword };
  const fieldErrors = {
    code: validateCode(code),
    newPassword: validateNewPassword(newPassword),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  return forgotPassword(code, newPassword);
};

export default function ForgotPassword() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  return (
    <div className='container'>
      <div className='content'>
        <h1>Forgot Password</h1>
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
          <div>
            <label htmlFor='code-input'>Confirmation Code</label>
            <input
              type='text'
              id='code-input'
              name='code'
              aria-invalid={Boolean(actionData?.fieldErrors?.code)}
              aria-describedby={
                actionData?.fieldErrors?.code ? 'code-error' : undefined
              }
              style={{
                borderColor: actionData?.fieldErrors?.code ? 'red' : '',
              }}
            />
            {actionData?.fieldErrors?.code ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.fieldErrors?.code}
              />
            ) : null}
          </div>
          <div>
            <label htmlFor='newPassword-input'>New Password</label>
            <input
              type='password'
              id='newPassword-input'
              name='newPassword'
              aria-invalid={Boolean(actionData?.fieldErrors?.newPassword)}
              aria-describedby={
                actionData?.fieldErrors?.newPassword
                  ? 'newPassword-error'
                  : undefined
              }
              style={{
                borderColor: actionData?.fieldErrors?.newPassword ? 'red' : '',
              }}
            />
            {actionData?.fieldErrors?.newPassword ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.fieldErrors?.newPassword}
              />
            ) : null}
          </div>
          <div id='form-error-message'>
            {actionData?.formError ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.formError}
              />
            ) : null}
          </div>
          <button
            type='submit'
            className='button'
            disabled={transition.state === 'submitting'}
          >
            {transition.state === 'submitting'
              ? 'Changing....'
              : 'Change Password'}
          </button>
        </Form>
      </div>
      <div className='links'>
        <ul>
          <li>
            <Link prefetch='intent' to='/'>
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
