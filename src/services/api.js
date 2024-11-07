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

export const getMatches = async (date) => {
  try {
    const response = await api.get('/fixtures', {
      params: { date }
    });
    return response.data.response;
  } catch (error) {
    const customError = new Error(error.response?.data?.message || 'Failed to fetch matches');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};

export const getLiveMatches = async () => {
  try {
    const response = await api.get('/fixtures', {
      params: { live: 'all' }
    });
    return response.data.response;
  } catch (error) {
    const customError = new Error(error.response?.data?.message || 'Failed to fetch live matches');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};

export const getStandings = async (leagueId, season) => {
  try {
    const response = await api.get('/standings', {
      params: { league: leagueId, season }
    });
    return response.data.response[0]?.league?.standings[0] || [];
  } catch (error) {
    const customError = new Error(error.response?.data?.message || 'Failed to fetch standings');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};