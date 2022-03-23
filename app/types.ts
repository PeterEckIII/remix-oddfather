export type Team = {
  id: string;
  sport: string;
  name: string;
  shortname: string;
  city: string;
  state: string;
  stadium: string;
  league: string;
  conference: string;
  division: string;
  games: Game[];
  createdAt: number;
  updatedAt: number;
};

export type Game = {
  id: string;
  boxscoreIndex: string;
  type: string;
  sport: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamID: string;
  awayTeamID: string;
  homeScore: string;
  awayScore: string;
  venue: string;
  datetimeEpoch: number;
  gameDate: number;
  gameTime: string;
  odds: Odd[];
  createdAt: number;
  updatedAt: number;
};

export type Odd = {
  moneylineAwayOpen: number;
  moneylineAwayClose: number;
  moneylineHomeOpen: number;
  moneylineHomeClose: number;
  spreadAwayOpen: number;
  spreadAwayClose: number;
  spreadHomeOpen: number;
  spreadHomeClose: number;
  spreadAwayOpenPayout: number;
  spreadAwayClosePayout: number;
  spreadHomeOpenPayout: number;
  spreadHomeClosePayout: number;
  totalOpen: number;
  totalClose: number;
  overPayoutOpen: number;
  overPayoutClose: number;
  underPayoutOpen: number;
  underPayoutClose: number;
  createdAt: number;
  updatedAt: number;
};

type GameItem = {
  items: Game[];
  nextToken: string;
};

export type GameDay = {
  mlb: GameItem;
  nfl: GameItem;
  nba: GameItem;
  nhl: GameItem;
  ncaab: GameItem;
  ncaaf: GameItem;
};

export function assertDefined<T>(
  value: T | null | undefined
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Expected defined value but got ${value}`);
  }
}
