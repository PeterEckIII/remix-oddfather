import type { Game } from '~/types';
import GameCard from '../GameCard';

type LeagueContainerProps = {
  games: Game[];
  league: string;
};

const LeagueContainer = ({ games, league }: LeagueContainerProps) => (
  <div className='league-container'>
    <h1>{league}</h1>
    <div className='league-content'>
      {games.map(game => (
        <GameCard key={`${game.boxscoreIndex}`} game={game} />
      ))}
    </div>
  </div>
);

export default LeagueContainer;
