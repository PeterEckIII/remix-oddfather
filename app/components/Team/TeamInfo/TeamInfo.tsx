import styles from "./styles.css";
import { LinksFunction } from "remix";

import Teams from "../Teams";
// import Scores from "../Scores";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type TeamInfoProps = {
  homeShortname: string;
  homeScore: string;
  awayShortname: string;
  awayScore: string;
};

const TeamInfo = ({
  homeShortname,
  homeScore,
  awayShortname,
  awayScore,
}: TeamInfoProps) => (
  <div className="team-info-container">
    <div className="teams-container">
      <div>
        <Teams homeShortname={homeShortname} awayShortname={awayShortname} />
      </div>
    </div>
    <div className="scores-container">
      <div>{/* <Scores homeScore={homeScore} awayScore={awayScore} /> */}</div>
    </div>
  </div>
);

export default TeamInfo;
