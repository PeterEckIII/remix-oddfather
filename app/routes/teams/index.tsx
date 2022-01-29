import { Outlet, Link, useLoaderData, useCatch } from "remix";
import type { LoaderFunction } from "remix";
import { Team } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { teams: Array<Team> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    teams: await db.team.findMany(),
  };
  if (!data) {
    throw new Response(`No teams found`, {
      status: 404,
    });
  }
  return data;
};

export default function TeamsRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Teams Route</h1>
      <main>
        <div>
          <ul>
            {data.teams.map((team: Team) => {
              return (
                <li key={team.id}>
                  {team.name}
                  <Link prefetch="intent" to={team.id}>
                    {team.shortname}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="teams-outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return <div className="error-container">There are no teams to display</div>;
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="error-container">
      There was an error loading teams from the server. Please go back to the
      last page and try again
    </div>
  );
}
