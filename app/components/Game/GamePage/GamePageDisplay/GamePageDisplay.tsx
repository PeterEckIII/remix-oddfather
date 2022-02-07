import styles from './styles.css';
import { LinksFunction } from 'remix';
import { Team, Odd, Game } from '~/types';

import Logo from '../Logo';
import Location from '../Location';
import Score from '../Score';
import Time from '../Time';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type GamePageDisplayProps = {
  game: Game;
};

const GamePageDisplay = ({ game }: GamePageDisplayProps) => {
  // get team logos with shortname

  return (
    <div className='game-page-container'>
      <h1>
        {game.homeTeam.shortname} vs . {game.awayTeam.shortname}
      </h1>
      <div className='heading'>
        <div>Logo</div>
        <Score homeScore={game.homeScore} awayScore={game.awayScore} />
        <div>Logo</div>
      </div>
      <Time datetimeEpoch={game.datetimeEpoch} />
      <Location
        venue={game.venue}
        city={game.homeTeam.city}
        state={game.homeTeam.state}
      />
      <div className='odds-container'>
        <div>Moneyline Table</div>
        <div>Spread Table</div>
        <div>Over Under Table</div>
      </div>
    </div>
  );
};

export default GamePageDisplay;
