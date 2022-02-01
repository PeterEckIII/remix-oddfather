import type { ActionFunction, LinksFunction, MetaFunction } from "remix";
import {
  Link,
  useActionData,
  json,
  useSearchParams,
  redirect,
  Form,
  useTransition,
} from "remix";
import stylesUrl from "../styles/register.css";
import { createUserSession } from "~/utils/session.server";
import { signUp } from "~/utils/cognito.server";
import ValidationMessage from "~/components/ValidationMessage";
import Button from "~/components/Button";
import Input from "~/components/Input";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Oddfather | Registration",
    description:
      "Create an Oddfather account to get access to today's best sports betting advice",
  };
};

function validateEmail(email: unknown) {
  const regEx = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$");
  if (typeof email !== "string") return `Email address error`;
  const formattedEmail = email.toLowerCase();
  if (!formattedEmail.match(regEx)) return `Please enter a valid email address`;
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 8) {
    return `Please choose a password with at least 8 characters`;
  }
}

function validateConfirmPassword(password: unknown, confirmPassword: unknown) {
  if (typeof confirmPassword !== "string") {
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
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirm-password");
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
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
  return newUser;
};

export default function RegisterRoute() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div className="container">
      <div className="content">
        <h1>Registration</h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? "form-error-message" : undefined
          }
        >
          <div className="input-container">
            <label htmlFor="email-input">Email</label>
            <input
              type="text"
              id="email-input"
              name="email"
              defaultValue={actionData?.fieldErrors?.email}
              aria-describedby={
                actionData?.fieldErrors?.email ? "email-error" : undefined
              }
              style={{
                borderColor: actionData?.fieldErrors?.email ? "red" : "",
              }}
            />
            {actionData?.fieldErrors?.email ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error={actionData?.fieldErrors?.email}
              />
            ) : null}
          </div>
          <div className="input-container">
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              id="password-input"
              name="password"
              defaultValue={actionData?.fieldErrors?.password}
              aria-describedby={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
              style={{
                borderColor: actionData?.fieldErrors?.password ? "red" : "",
              }}
            />
            {actionData?.fieldErrors?.password ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error={actionData?.fieldErrors?.password}
              />
            ) : null}
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password-input">Confirm Password</label>
            <input
              type="password"
              id="confirm-password-input"
              name="confirm-password"
              defaultValue={actionData?.fieldErrors?.confirmPassword}
              aria-describedby={
                actionData?.fieldErrors?.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
              style={{
                borderColor: actionData?.fieldErrors?.confirmPassword
                  ? "red"
                  : "",
              }}
            />
            {actionData?.fieldErrors?.confirmPassword ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error={actionData?.fieldErrors?.confirmPassword}
              />
            ) : null}
          </div>
          <div className="button-container">
            <button
              className="button"
              type="submit"
              disabled={transition.state === "submitting"}
            >
              {transition.state === "submitting"
                ? "Registering...."
                : "Register"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
