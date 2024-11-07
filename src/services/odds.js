import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': process.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  },
  timeout: 10000
});

export const getOddsByFixture = async (fixtureId) => {
  try {
    const response = await api.get('/odds', {
      params: { fixture: fixtureId }
    });
    return response.data.response;
  } catch (error) {
    const customError = new Error(error.response?.data?.message || 'Failed to fetch odds');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};

export const getOddsByLeague = async (leagueId, bookmaker = null, page = 1) => {
  try {
    const params = {
      league: leagueId,
      page
    };
    if (bookmaker) params.bookmaker = bookmaker;

    const response = await api.get('/odds', { params });
    return response.data.response;
  } catch (error) {
    const customError = new Error(error.response?.data?.message || 'Failed to fetch league odds');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};