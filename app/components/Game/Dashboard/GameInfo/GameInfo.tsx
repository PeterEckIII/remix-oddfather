import Time from '../Time';
import Venue from '../Venue';

type GameInfoProps = {
  datetimeEpoch: number;
  venue: string;
};

const GameInfo = ({ datetimeEpoch, venue }: GameInfoProps) => (
  <div className='game-info-container'>
    <div className='game-info-content'>
      <Time datetimeEpoch={datetimeEpoch} />
      <Venue venue={venue} />
    </div>
  </div>
);

export default GameInfo;
