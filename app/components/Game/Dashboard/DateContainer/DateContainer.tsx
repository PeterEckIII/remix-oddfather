import { ReactNode } from "react";
import styles from "./styles.css";
import { LinksFunction } from "remix";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type DateContainerProps = {
  children: ReactNode;
  containerDate: string;
};

const DateContainer = ({ containerDate, children }: DateContainerProps) => (
  <div className="date-container">
    <div>
      <h1>{containerDate}</h1>
      {children}
    </div>
  </div>
);

export default DateContainer;
