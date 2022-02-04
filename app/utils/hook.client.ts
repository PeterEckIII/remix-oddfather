import { useState, useEffect, useRef } from "react";
import { DocumentNode, gql, TypedDocumentNode } from "@apollo/client";
import { client } from "./api.server";

type Variables = {
  type?: string;
  limit?: number;
  sortDirection?: "DESC" | "ASC";
  nextToken?: string;
};

type FetchGamesProps = {
  token: string;
  givenQuery: DocumentNode | TypedDocumentNode;
  variables: Variables;
};

interface Options {
  callback: () => Promise<unknown>;
  element: HTMLElement | null;
  nextToken: string;
  query: string;
  variables: Variables;
}

export const useInfiniteScroll = ({
  callback,
  element,
  nextToken,
  query,
  variables,
}: Options) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const observer = useRef<IntersectionObserver>();
  const nextQuery = gql`
    ${query}
  `;

  const fetchNextGames = async ({
    token,
    givenQuery,
    variables,
  }: FetchGamesProps) => {
    let params = { ...variables, nextToken: token };
    try {
      const result = await client.query({
        query: givenQuery,
        variables: params,
      });
      const { data } = result;
      setData(data);
      return data;
    } catch (error) {
      console.log(`Error fetching next games: ${error}`);
      throw new Error(`Error fetching more games: ${error}`);
    }
  };

  useEffect(() => {
    if (!element) {
      return;
    }
    observer.current = new IntersectionObserver(async (entries) => {
      if (!loading && entries[0].isIntersecting) {
        setLoading(true);
        await fetchNextGames({
          token: nextToken,
          givenQuery: nextQuery,
          variables,
        });
        callback().finally(() => setLoading(false));
      }
    });
    observer.current.observe(element);

    return () => observer.current?.disconnect();
  }, [callback, loading, element]);

  return [observer, loading, data];
};
