import { teams } from '~/utils/returnTeamLogo';
import Team from '../Team';

type TeamsProps = {
  homeShortname: string;
  awayShortname: string;
};

const Teams = ({ homeShortname, awayShortname }: TeamsProps) => {
  const homeLogo = (teams as any)[homeShortname];
  const awayLogo = (teams as any)[awayShortname];

  return (
    <div className='teams-container'>
      <div className='home-team-container'>
        <Team logo={homeLogo} shortname={homeShortname} />
      </div>
      <div className='away-team-container'>
        <Team logo={awayLogo} shortname={awayShortname} />
      </div>
    </div>
  );
};

export default Teams;
