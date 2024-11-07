import express from 'express';
import { getOddsByFixture, getOddsByLeague } from '../services/odds.js';

export const router = express.Router();

router.get('/fixture/:fixtureId', async (req, res, next) => {
  try {
    const { fixtureId } = req.params;
    if (!fixtureId || isNaN(fixtureId)) {
      const error = new Error('Invalid fixture ID');
      error.statusCode = 400;
      throw error;
    }

    const odds = await getOddsByFixture(fixtureId);
    res.json({
      status: 'success',
      data: odds
    });
  } catch (error) {
    next(error);
  }
});

router.get('/league/:leagueId', async (req, res, next) => {
  try {
    const { leagueId } = req.params;
    const { bookmaker, page = 1 } = req.query;

    if (!leagueId || isNaN(leagueId)) {
      const error = new Error('Invalid league ID');
      error.statusCode = 400;
      throw error;
    }

    const odds = await getOddsByLeague(leagueId, bookmaker, page);
    res.json({
      status: 'success',
      data: odds
    });
  } catch (error) {
    next(error);
  }
});