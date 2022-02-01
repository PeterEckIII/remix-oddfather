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
import { db } from "~/utils/db.server";
import stylesUrl from "../styles/login.css";
import { createUserSession } from "~/utils/session.server";
import { signUp, login } from "~/utils/cognito.server";
import ValidationMessage from "~/components/ValidationMessage";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Oddfather | Login",
    description: "Login to get access to today's best betting odds",
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
    loginType: string;
    email: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => {
  json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const email = form.get("email");
  const password = form.get("password");
  const redirectTo = form.get("redirectTo") || "/games";
  if (
    typeof loginType !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }

  const fields = { loginType, email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const user = await login({ email, password });
  if (!user) {
    throw new Error(`Error logging user in`);
  }
  const id = await user.getIdToken().getJwtToken();
  return 1;
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Login</h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? "form-error-message" : undefined
          }
        >
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset disabled={transition.state === "submitting"}>
            <legend className="sr-only">Login or Register</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
              />{" "}
              Register
            </label>
          </fieldset>
          <div className="input-container email-container">
            <label htmlFor="email-input">Email</label>
            <input
              type="text"
              id="email-input"
              name="email"
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
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
          <div className="input-container password-container">
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              id="password-input"
              name="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.password) || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
              style={{ borderColor: actionData?.fieldErrors?.password }}
            />
            {actionData?.fieldErrors?.password ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error={actionData?.fieldErrors?.password}
              />
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error={actionData?.formError}
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
                ? "Authenticating...."
                : "Log In"}
            </button>
          </div>
        </Form>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link prefetch="intent" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link prefetch="intent" to="/games">
              Games
            </Link>
          </li>
          <li>
            <Link prefetch="intent" to="/teams">
              Teams
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
