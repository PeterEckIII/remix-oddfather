import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import stylesUrl from "~/styles/index.css";
import { client } from "~/utils/api.server";
import { gql } from "@apollo/client";
import { todaysGames } from "~/utils/queries.server";

export const loader: LoaderFunction = async () => {
  const TODAYS_GAMES = gql`
    ${todaysGames}
  `;
  const results = await client.query({
    query: TODAYS_GAMES,
    variables: {
      limit: 10,
    },
  });
  return results;
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
  console.log(`Results: ${JSON.stringify(results, null, 2)}`);

  return (
    <div>
      <p>Results in console</p>
      <div></div>
    </div>
  );
}
