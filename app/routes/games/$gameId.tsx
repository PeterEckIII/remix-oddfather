import { gql } from '@apollo/client';
import { LoaderFunction, MetaFunction, LinksFunction } from 'remix';
import { useLoaderData, useCatch, useParams, redirect } from 'remix';
import GamePageDisplay from '~/components/Game/GamePage/GamePageDisplay';
import type { Game } from '~/types';
import { client } from '~/utils/api.server';
import { getUserSession } from '~/sessions';
import { getTruncatedGame } from '~/utils/queries';
import stylesUrl from '~/styles/game.css';
import { sportSwap } from '~/utils/sportSwap';
import { links as tableLink } from '~/components/Table/Table/Table';

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: 'No game',
      description: 'No game found',
    };
  }
  return {
    title: `OF | ${(sportSwap as any)[data.sport]} | ${
      data.homeTeam.shortname
    }/${data.awayTeam.shortname}`,
    description: `${data.venue} @ ${new Date(data.datetimeEpoch)}`,
  };
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  ...tableLink(),
];

interface LoaderData extends Game {
  game: Game;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const authenticated = await getUserSession(request);
  if (!authenticated.data.userId) return redirect('/login');
  const id = params.gameId;
  const GET_GAME = gql`
    ${getTruncatedGame}
  `;

  const results = await client.query({
    query: GET_GAME,
    variables: {
      id,
    },
  });
  if (!results) throw new Error(`No results for game ID: ${id}`);
  return results.data.getGame;
};

export default function GameRoute() {
  const game = useLoaderData<LoaderData>();
  console.log(`Game: ${JSON.stringify(game, null, 2)}`);
  return (
    <div className='gamepage-container'>
      <GamePageDisplay game={game} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className='error-container'>
        Error -- there is no game with id ${params.gameId}
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { gameId } = useParams();
  return (
    <div className='error-container'>{`There was an error loading game with id ${gameId}`}</div>
  );
}
