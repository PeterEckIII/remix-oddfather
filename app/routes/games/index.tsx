import { Outlet, Link, useLoaderData, useCatch, Form } from "remix";
import type { LoaderFunction } from "remix";
import type { Game, User } from "@prisma/client";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import { getCurrentUser } from "~/utils/cognito.server";

type LoaderData = {
  user: User | null;
  games: Array<Game>;
};

export let loader: LoaderFunction = async ({ request }) => {
  const games = await db.game.findMany({
    take: 10,
    orderBy: { datetimeEpoch: "desc" },
  });
  if (!games) {
    throw new Response(`No games found`, {
      status: 404,
    });
  }
  const user = await getCurrentUser();
  const data: LoaderData = {
    user,
    games,
  };
  return data;
};

export default function GamesRoute() {
  const data = useLoaderData();
  return (
    <div>
      <header>
        <h1>
          <Link prefetch="intent" to="/" aria-label="Oddfather Betting">
            <span className="logo">OF</span>
            <span className="logo-medium">OddFather</span>
          </Link>
        </h1>
        {data.user ? (
          <div className="user-info">
            <span>{`Hi ${data.user.username}`}</span>
            <Form reloadDocument action="/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </Form>
          </div>
        ) : (
          <Link prefetch="intent" to="/login">
            Login
          </Link>
        )}
      </header>
      <main>
        <div>
          <ul>
            {data.games.map((game: Game) => {
              return (
                <li key={game.id}>
                  {game.homeScore} - {game.awayScore}
                  <Link prefetch="intent" to={game.id}>
                    {game.boxscoreIndex}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="games-outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return <div className="error-container">There are no games to display</div>;
  }
  throw new Error(`Unexpected caught response with status ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="error-container">
      There was an error loading games from the server. Please go back to the
      last page and try again
    </div>
  );
}
