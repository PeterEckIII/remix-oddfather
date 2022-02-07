import { LinksFunction } from 'remix';
import styles from './styles.css';
import type { Game } from '~/types';
import TeamInfo from '../../../Team/TeamInfo';
import GameInfo from '../GameInfo';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => (
  <div className='game-card-container'>
    <TeamInfo
      homeShortname={game.homeTeam.shortname}
      homeScore={game.homeScore}
      awayShortname={game.awayTeam.shortname}
      awayScore={game.awayScore}
    />
    <GameInfo
      datetimeEpoch={game.datetimeEpoch}
      venue={game.venue}
      city={game.homeTeam.city}
      state={game.homeTeam.state}
    />
    <button>Odds Button</button>
  </div>
);

export default GameCard;
