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

import stylesUrl from "../styles/confirm-register.css";
import { createUserSession } from "~/utils/session.server";
import { confirmSignUp } from "~/utils/cognito.server";
import ValidationMessage from "~/components/ValidationMessage";
import Button from "~/components/Button";
import Input from "~/components/Input";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Oddfather | Confirm Registration",
    description: "Confirm your registration on Oddfather.com",
  };
};

function validateConfirmationCode(code: string | undefined) {
  if (typeof code !== "string") {
    return `Code is not entered correctly`;
  }
  if (code.length < 5) {
    return `Code must be at least 5 characters`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    code: string | undefined;
  };
  fields?: {
    code: string | undefined;
  };
};

const badRequest = (data: ActionData) => {
  json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const code = form.get("code");
  const email = form.get("email");
  if (typeof code !== "string" || typeof email !== "string")
    return badRequest({ formError: `Form not submitted correctly` });

  const fields = { code };
  const fieldErrors = {
    code: validateConfirmationCode(code),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const res = await confirmSignUp({ code, email });
  if (!res) {
    return badRequest({
      fields,
      formError: `Incorrect code. Please try registering again!`,
    });
    // TODO: DELETE ACCOUNT AND START OVER OR RESEND VERIFICATION CODE
  }
  return null;
};

export default function ConfirmRegisterRoute() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  return (
    <div className="container">
      <div className="content">
        <h1>Confirm Registration</h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? "form-error-message" : undefined
          }
        >
          <input
            type="hidden"
            name="email"
            id="email"
            value={searchParams.get("email") ?? undefined}
          />
          <Input
            type="text"
            id="code-input"
            labelText="Confirmation Code"
            defaultValue={actionData?.fieldErrors?.code}
            htmlFor="code"
            invalid={Boolean(actionData?.fieldErrors?.code)}
            describedBy={
              actionData?.fieldErrors?.code ? "code-error" : undefined
            }
            style={{ borderColor: actionData?.fieldErrors?.code ? "red" : "" }}
          />
          {actionData?.fieldErrors?.code ? (
            <ValidationMessage
              isSubmitting={transition.state === "submitting"}
              error={actionData?.fieldErrors?.code}
            />
          ) : null}
          {actionData?.formError ? (
            <ValidationMessage
              isSubmitting={transition.state === "submitting"}
              error={actionData?.formError}
            />
          ) : null}
          <Button
            transitionState={transition.state}
            callToAction="Confirm Account"
            loadingText="Confirming...."
          />
        </Form>
      </div>
    </div>
  );
}
