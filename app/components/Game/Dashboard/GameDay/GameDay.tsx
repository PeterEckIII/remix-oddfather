import DateContainer from "../DateContainer";
import GameContainer from "../GameContainer";
import type { GameDay } from "~/types";
import styles from "./styles.css";
import type { LinksFunction } from "remix";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type GameDayProps = {
  games: GameDay;
  containerDate: string;
};

const GameDayDisplay = ({ games, containerDate }: GameDayProps) => (
  <div className="gameday-container">
    <h1>{containerDate}</h1>
    <DateContainer containerDate={containerDate}>
      <GameContainer games={games.mlb.items} sport="MLB" />
      <GameContainer games={games.nfl.items} sport="NFL" />
      <GameContainer games={games.nba.items} sport="NBA" />
      <GameContainer games={games.nhl.items} sport="NHL" />
      <GameContainer games={games.ncaab.items} sport="NCAA Basketball" />
      <GameContainer games={games.ncaaf.items} sport="NCAA Football" />
    </DateContainer>
  </div>
);

export default GameDayDisplay;
