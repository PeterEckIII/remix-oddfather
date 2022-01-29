import type { LoaderFunction, MetaFunction } from "remix";
import { Link, useLoaderData, useCatch, useParams } from "remix";
import type { Game } from "@prisma/client";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No game",
      description: "No game found",
    };
  }
  return {
    title: `"${data.game.sport} - ${data.game.boxscoreIndex}"`,
    description: `${data.game.venue} @ ${new Date(data.game.datetimeEpoch)}`,
  };
};

type LoaderData = {
  game: Game;
};

export const loader: LoaderFunction = async ({ params }) => {
  const game = await db.game.findUnique({
    where: { id: params.gameId },
  });
  if (!game) {
    throw new Response(`This game could not be found`, {
      status: 404,
    });
  }
  const data: LoaderData = { game };
  return data;
};

export default function GameRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>{data.game.venue}</p>
      <p>
        {data.game.homeScore} - {data.game.awayScore}
      </p>
      <Link to=".">{data.game.boxscoreIndex}</Link>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="error-container">
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
    <div className="error-container">{`There was an error loading game with id ${gameId}`}</div>
  );
}
