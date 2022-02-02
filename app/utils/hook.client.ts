import { useState, useEffect, useRef, MutableRefObject } from "react";
import { DocumentNode, gql, Observer, TypedDocumentNode } from "@apollo/client";
import { Game } from "~/types";
import { client } from "./api.server";

type Variables = {
  type?: string;
  limit?: number;
  sortDirection?: "DESC" | "ASC";
  nextToken?: string;
};

type FetchGamesProps = {
  token: string;
  givenQuery: string | DocumentNode;
  variables: Variables;
};

type InfiniteScrollProps = {
  initialGames: Game[];
  initialToken: string;
};

export const useInfiniteScroll = ({
  initialGames,
  initialToken,
  query,
}: InfiniteScrollProps) => {
  const [token, setToken] = useState<string>(initialToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState(initialGames);
  const [error, setError] = useState<string | unknown>("");
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(ref, { threshold: 0 }, false);
  const givenQuery = gql`
    ${query}
  `;

  const fetchMoreGames = async ({
    token,
    givenQuery,
    variables,
  }: FetchGamesProps) => {
    setLoading(true);
    let params = { ...variables };
    try {
      const result = await client.query({
        query,
        variables,
      });
      const data = result.data.QUERY;
      const { items, nextToken } = data;
      setGames((games) => [...games, ...items]);
      setToken(nextToken);
    } catch (error) {
      setError(error);
      console.log(`Fetch error on useInfiniteScroll: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isBottomVisible! &&
      fetchMoreGames({ token, givenQuery, variables: params });
  }, [isBottomVisible]);
};

export const useIntersectionObserver = (
  ref: any,
  options = {},
  forward = true
) => {
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const observer = useRef<React.RefObject<
    MutableRefObject<IntersectionObserver>
  > | null>(null);

  const cleanObserver = (observer: any) => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setTarget(ref.current);
  }, [ref]);

  useEffect(() => {
    if (typeof observer === "undefined") {
      throw new Error(`Error`);
    }
    if (!target) {
      cleanObserver(observer);
      const ob = (observer.current = new IntersectionObserver(
        ([entry]) => {
          const isElementIntersecting = entry.isIntersecting;
          if (!forward) {
            setIsIntersecting(isElementIntersecting);
          } else if (forward && !isIntersecting && isElementIntersecting) {
            setIsIntersecting(isElementIntersecting);
            cleanObserver(observer);
          }
        },
        { ...options }
      ));
      if (target) {
        ob.observe(target);
      }
      return () => {
        cleanObserver(observer);
      };
    }
  }, [target, options]);
};
