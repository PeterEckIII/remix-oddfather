import styles from './styles.css';
import { LinksFunction } from 'remix';

import Time from '../Time';
import Venue from '../Venue';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type GameInfoProps = {
  datetimeEpoch: number;
  venue: string;
  city: string;
  state: string;
};

const GameInfo = ({ datetimeEpoch, venue, city, state }: GameInfoProps) => (
  <div className='game-info-container'>
    <div className='game-info-content'>
      <Time datetimeEpoch={datetimeEpoch} />
      <Venue venue={venue} />
    </div>
  </div>
);

export default GameInfo;
