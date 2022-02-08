import styles from './styles.css';
import { LinksFunction } from 'remix';

import Teams from '../Teams';
import Scores from '../../Game/Dashboard/Scores';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

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
  <div className='team-info-container'>
    <div className='team-info-content'>
      <div>
        <Teams homeShortname={homeShortname} awayShortname={awayShortname} />
      </div>
      <div className='score-container'>
        <Scores homeScore={homeScore || '-'} awayScore={awayScore || '-'} />
      </div>
    </div>
  </div>
);

export default TeamInfo;
