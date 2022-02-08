import type { Game } from '~/types';
import TeamInfo from '../../../Team/TeamInfo';
import GameInfo from '../GameInfo';
import OddsButton from '../OddsButton';

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
    <GameInfo datetimeEpoch={game.datetimeEpoch} venue={game.venue} />
    <OddsButton gameId={game.id} />
  </div>
);

export default GameCard;
