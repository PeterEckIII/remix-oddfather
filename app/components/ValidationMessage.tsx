import { useState, useEffect } from 'react';

type ValidationProps = {
  error: String;
  isSubmitting: Boolean;
};

export default function ValidationMessage({
  error,
  isSubmitting,
}: ValidationProps) {
  const [show, setShow] = useState<Boolean>(!!error);
  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        height: show ? '1rem' : 0,
        color: 'red',
        transition: 'all 300ms ease-in-out',
      }}
    >
      {error}
    </div>
  );
}
