import { prisma, Prisma, PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import games from "./games";

async function getUser() {
  return await db.user.create({
    data: {
      username: "test",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
}

getUser();

async function getGames() {
  games.map(async (game) => {
    return await db.game.create({
      data: {
        id: uuidv4(),
        boxscoreIndex: game.boxscoreIndex,
        sport: game.sport,
        venue: game.venue,
        datetimeEpoch: new Date(game.datetimeEpoch),
        homeScore: game.homeScore,
        awayScore: game.awayScore,
        awayTeamId: game.awayTeamID,
        homeTeamId: game.homeTeamID,
        odds: {
          spreadHomeOpen: game.odds.spreadHomeClose,
          spreadHomeClose: game.odds.spreadHomeClose,
          spreadAwayOpen: game.odds.spreadAwayOpen,
          spreadAwayClose: game.odds.spreadAwayClose,
          spreadHomeOpenPayout: game.odds.spreadHomeOpenPayout,
          spreadHomeClosePayout: game.odds.spreadHomeClosePayout,
          spreadAwayOpenPayout: game.odds.spreadAwayOpenPayout,
          spreadAwayClosePayout: game.odds.spreadAwayClosePayout,
          moneylineHomeOpen: game.odds.moneylineHomeOpen,
          moneylineHomeClose: game.odds.moneylineHomeClose,
          moneylineAwayOpen: game.odds.moneylineAwayOpen,
          moneylineAwayClose: game.odds.moneylineAwayClose,
          overPayoutOpen: game.odds.overPayoutOpen,
          overPayoutClose: game.odds.overPayoutClose,
          underPayoutOpen: game.odds.underPayoutOpen,
          underPayoutClose: game.odds.underPayoutClose,
          totalOpen: game.odds.totalOpen,
          totalClose: game.odds.totalClose,
        },
      },
    });
  });
}

getGames();
