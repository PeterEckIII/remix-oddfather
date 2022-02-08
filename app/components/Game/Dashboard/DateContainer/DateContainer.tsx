import { ReactNode } from 'react';

type DateContainerProps = {
  children: ReactNode;
  containerDate: string | Date;
};

const DateContainer = ({ containerDate, children }: DateContainerProps) => (
  <div className='date-container'>
    <div>
      <h1 className='date-heading'>{containerDate}</h1>
      {children}
    </div>
  </div>
);

export default DateContainer;
