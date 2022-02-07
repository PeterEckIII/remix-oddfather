import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  json,
} from "remix";
import stylesUrl from "~/styles/index.css";
import { client } from "~/utils/api.server";
import { gql } from "@apollo/client";
import { todaysGames } from "~/utils/queries";
import { getUserSession } from "~/utils/cognito.server";
import GameDay from "~/components/Game/Dashboard/GameDay";

export const loader: LoaderFunction = async ({ request }) => {
  let res;
  const authenticated = await getUserSession(request);
  authenticated.data.userId
    ? async () => {
        const TODAYS_GAMES = gql`
          ${todaysGames}
        `;
        const results = await client.query({
          query: TODAYS_GAMES,
          variables: {
            gameDate: "2021-09-15",
          },
        });
        res = results;
      }
    : (res = null);
  redirect("/login");
  return res;
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  const description = `Oddfather brings you the best sports odds from across the web. Combining book values with our proprietary data model allows our service to notify you when "value" is found in an event.`;
  return {
    title: "Oddfather Betting | Home",
    description,
  };
};

export default function IndexRoute() {
  const results = useLoaderData();
  const date = new Date(1631664001000);
  console.log(`Results: ${JSON.stringify(results)}`);
  return (
    <div>
      <GameDay games={results?.data?.todaysGames} containerDate={date} />
    </div>
  );
}
