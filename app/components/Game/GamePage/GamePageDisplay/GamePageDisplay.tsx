import styles from './styles.css';
import { LinksFunction } from 'remix';
import { Game, Odd } from '~/types';
import { teams } from '~/utils/returnTeamLogo';

import SpreadTable from '~/components/Table/Spread';
import OverUnderTable from '~/components/Table/OverUnder';
import MoneylineTable from '~/components/Table/Moneyline';
import Logo from '../Logo';
import Location from '../Location';
import Score from '../Score';
import Time from '../Time';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type GamePageDisplayProps = {
  game: Game;
};

const GamePageDisplay = ({ game }: GamePageDisplayProps) => {
  const homeLogo = (teams as any)[game.homeTeam.shortname];
  const awayLogo = (teams as any)[game.awayTeam.shortname];

  return (
    <div className='game-page-container'>
      <h1 className='game-page-heading'>
        {game.homeTeam.shortname} vs . {game.awayTeam.shortname}
      </h1>
      <div className='competitor-display'>
        <Logo logo={homeLogo} shortname={game.homeTeam.shortname} />
        <Score homeScore={game.homeScore} awayScore={game.awayScore} />
        <Logo logo={awayLogo} shortname={game.awayTeam.shortname} />
      </div>
      <Time datetimeEpoch={game.datetimeEpoch} />
      <Location
        venue={game.venue}
        city={game.homeTeam.city}
        state={game.homeTeam.state}
      />
      <div className='odds-container'>
        <MoneylineTable
          homeTeamName={game.homeTeam.shortname}
          homeOpen={(game.odds as any)['moneylineHomeOpen']}
          homeClose={(game.odds as any)['moneylineHomeClose']}
          awayTeamName={game.awayTeam.shortname}
          awayOpen={(game.odds as any)['moneylineAwayOpen']}
          awayClose={(game.odds as any)['moneylineAwayClose']}
        />
        <SpreadTable
          teamInfo={{
            homeTeamName: game.homeTeam.shortname,
            awayTeamName: game.awayTeam.shortname,
          }}
          spreadData={{
            homeOpen: (game.odds as any)['spreadHomeOpen'],
            homeClose: (game.odds as any)['spreadHomeClose'],
            awayOpen: (game.odds as any)['spreadAwayOpen'],
            awayClose: (game.odds as any)['spreadAwayClose'],
            homeOpenPayout: (game.odds as any)['spreadHomeOpenPayout'],
            homeClosePayout: (game.odds as any)['spreadHomeClosePayout'],
            awayOpenPayout: (game.odds as any)['spreadAwayOpenPayout'],
            awayClosePayout: (game.odds as any)['spreadAwayClosePayout'],
          }}
          tableName='Spread'
        />
        <OverUnderTable
          overUnderData={{
            totalOpen: (game.odds as any)['totalOpen'],
            totalClose: (game.odds as any)['totalClose'],
            overPayoutOpen: (game.odds as any)['overPayoutOpen'],
            overPayoutClose: (game.odds as any)['overPayoutClose'],
            underPayoutOpen: (game.odds as any)['underPayoutOpen'],
            underPayoutClose: (game.odds as any)['underPayoutClose'],
          }}
          tableName='Over Under'
        />
      </div>
    </div>
  );
};

export default GamePageDisplay;
