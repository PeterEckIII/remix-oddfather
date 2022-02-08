import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
} from 'remix';
import stylesUrl from '~/styles/dashboard.css';
import { client } from '~/utils/api.server';
import { gql } from '@apollo/client';
import { todaysGames } from '~/utils/queries';
import { getUserSession } from '~/utils/cognito.server';
import GameDay from '~/components/Game/Dashboard/GameDay';
import { formatDateForGameContainer } from '~/utils/dates';

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await getUserSession(request);
  if (!authenticated.data.userId) return redirect('/login');
  const TODAYS_GAMES = gql`
    ${todaysGames}
  `;
  const results = await client.query({
    query: TODAYS_GAMES,
    variables: {
      gameDate: '2021-09-15',
    },
  });
  return results.data.todaysGames;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  const description = `Oddfather brings you the best sports odds from across the web. Combining book values with our proprietary data model allows our service to notify you when "value" is found in an event.`;
  return {
    title: 'Oddfather Betting | Home',
    description,
  };
};

export default function DashboardRoute() {
  const games = useLoaderData();
  const newDate = new Date(1631664001000);
  const date = formatDateForGameContainer(newDate);
  return (
    <div>
      <GameDay games={games} containerDate={date} />
    </div>
  );
}
