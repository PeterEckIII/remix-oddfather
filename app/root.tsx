import {
  LiveReload,
  Outlet,
  Links,
  useCatch,
  Meta,
  Scripts,
  LoaderFunction,
  useLoaderData,
} from "remix";
import type { LinksFunction, MetaFunction } from "remix";
import globalStylesUrl from "~/styles/globals.css";
import globalMediumStylesUrl from "~/styles/globals-medium.css";
import globalLargeStylesUrl from "~/styles/globals-large.css";
import { ReactNode } from "react";

import Navbar from "~/components/UI/Navbar";
import UnauthNavbar from "./components/UI/UnauthNavbar";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getUser, getUserSession } from "./utils/cognito.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: globalMediumStylesUrl,
    },
    {
      rel: "stylesheet",
      href: globalLargeStylesUrl,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
  ];
};

export const meta: MetaFunction = () => {
  const description = `Oddfather brings you the best sports odds from across the web. Combining book values with our proprietary data model allows our service to notify you when "value" is found in an event.`;
  return {
    description,
    keywords:
      "Oddfather,betting,bet,odds,gambling,stakes,spread,moneyline,money line,over/under,over under",
    "twitter:creator": "@jpeckiii",
    "twitter:site": "@jpeckiii",
    "twitter:title": "Oddfather Betting",
    "twitter:description": description,
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  const authenticated = await getUserSession(request);
  return authenticated.data.userId ?? null;
};

function Document({
  children,
  title = `Oddfather Sports Betting`,
}: {
  children: ReactNode;
  title?: string;
}) {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {data ? <Navbar /> : <UnauthNavbar />}
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} -- {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Oh no!">
      <div className="error-container">
        <h1>Application Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
