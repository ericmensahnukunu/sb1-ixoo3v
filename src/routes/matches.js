import express from 'express';
import { getMatches, getLiveMatches } from '../services/api.js';

export const router = express.Router();

router.get('/live', async (req, res, next) => {
  try {
    const matches = await getLiveMatches();
    res.json({
      status: 'success',
      data: matches
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:date', async (req, res, next) => {
  try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(req.params.date)) {
      const error = new Error('Invalid date format. Use YYYY-MM-DD');
      error.statusCode = 400;
      throw error;
    }

    const matches = await getMatches(req.params.date);
    res.json({
      status: 'success',
      data: matches
    });
  } catch (error) {
    next(error);
  }
});