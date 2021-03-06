import DateContainer from '../DateContainer';
import GameContainer from '../GameContainer';
import type { GameDay } from '~/types';

type GameDayProps = {
  games: GameDay;
  containerDate: string | Date;
};

const GameDayDisplay = ({ games, containerDate }: GameDayProps) => (
  <div className='gameday-container'>
    <h1 className='gameday-headline'>{containerDate}</h1>
    <DateContainer containerDate={String(containerDate)}>
      <GameContainer games={games.mlb.items} sport='MLB' />
      <GameContainer games={games.nfl.items} sport='NFL' />
      <GameContainer games={games.nba.items} sport='NBA' />
      <GameContainer games={games.nhl.items} sport='NHL' />
      <GameContainer games={games.ncaab.items} sport='NCAA Basketball' />
      <GameContainer games={games.ncaaf.items} sport='NCAA Football' />
    </DateContainer>
  </div>
);

export default GameDayDisplay;
