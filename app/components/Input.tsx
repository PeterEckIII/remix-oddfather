import ValidationMessage from "./ValidationMessage";
import React from "react";

type InputProps = {
  id: string;
  htmlFor: string;
  labelText: string;
  defaultValue: string | undefined;
  invalid: boolean | undefined;
  describedBy: string | undefined;
  style?: any;
  isSubmitting: boolean;
  error: string | undefined;
  type: string;
};

export default function Input({
  id,
  htmlFor,
  labelText,
  defaultValue,
  invalid,
  describedBy,
  type,
  isSubmitting,
  error,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="input-container">
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        type={type || "submit"}
        id={id}
        name={htmlFor}
        defaultValue={defaultValue}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <ValidationMessage isSubmitting={isSubmitting} error={error} />
      ) : null}
    </div>
  );
}
