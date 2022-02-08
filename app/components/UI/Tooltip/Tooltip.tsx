import React, { ReactNode, useState } from 'react';

interface TooltipProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  delay?: number;
  children: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  content: string;
}

const Tooltip = ({
  delay,
  children,
  direction = 'top',
  content,
}: TooltipProps) => {
  let timeout: any;
  const [active, setActive] = useState<boolean>(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className='tooltip-wrapper'
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`tooltip-tip ${direction || 'top'}`}>{content}</div>
      )}
    </div>
  );
};

export default Tooltip;
