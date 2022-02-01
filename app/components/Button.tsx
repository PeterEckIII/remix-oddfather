import { ReactNode } from "react";

type ButtonProps = {
  transitionState: String;
  callToAction: String;
  loadingText: String;
};

export default function Button({
  transitionState,
  callToAction,
  loadingText,
  ...props
}: ButtonProps) {
  return (
    <div className="button-container">
      <button
        className="button"
        type="submit"
        disabled={transitionState === "submitting"}
        {...props}
      >
        {transitionState === "submitting" ? loadingText : callToAction}
      </button>
    </div>
  );
}
