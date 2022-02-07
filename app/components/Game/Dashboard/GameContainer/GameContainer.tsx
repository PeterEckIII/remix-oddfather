import { Game } from '~/types';
import GameCard from '../GameCard';

type GameContainerProps = {
  games: Game[];
  sport: string;
};

const GameContainer = ({ games, sport }: GameContainerProps) => (
  <div className='game-container'>
    <h4>{sport}</h4>
    <div className='game-content'>
      {games &&
        games.map(game => (
          <GameCard key={`${game.boxscoreIndex}`} game={game} />
        ))}
    </div>
  </div>
);

export default GameContainer;
