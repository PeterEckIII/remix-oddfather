import { Team } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "remix";
import { Link, useLoaderData, useParams, useCatch } from "remix";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No team",
      description: "No team found",
    };
  }
  return {
    title: `${data.team.name}`,
    description: `Home page for the ${data.team.league} ${data.team.name} (Known as the ${data.team.shortname}). Located in ${data.team.city}, ${data.team.state} and playing at ${data.team.stadium}`,
    keywords: `${data.team.name},${data.team.shortname},${data.team.stadium},${data.team.league}`,
  };
};

type LoaderData = { team: Team };

export const loader: LoaderFunction = async ({ params }) => {
  const team = await db.team.findUnique({
    where: { id: params.teamId },
  });
  if (!team) throw new Error(`Team not found`);
  const data: LoaderData = { team };
  return data;
};

export default function GameRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>{data.team.shortname}</p>
      <p>
        {data.team.city}, {data.team.state}
      </p>
      <p>Stadium: {data.team.stadium}</p>
      <Link to=".">{data.team.name}</Link>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="error-container">
        There is no team with id {params.teamId}
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { teamId } = useParams();
  return (
    <div className="error-container">{`There was an error loading team with id ${teamId}`}</div>
  );
}
