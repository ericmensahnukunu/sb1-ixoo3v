import axios from 'axios';
import { Match, League, Standing } from '../types';

const api = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  },
  timeout: 10000
});

export const getMatches = async (date: string): Promise<Match[]> => {
  try {
    const response = await api.get('/fixtures', {
      params: { date }
    });
    return response.data.response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch matches');
  }
};

export const getLeagues = async (): Promise<League[]> => {
  try {
    const response = await api.get('/leagues');
    return response.data.response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch leagues');
  }
};

export const getLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await api.get('/fixtures', {
      params: { live: 'all' }
    });
    return response.data.response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch live matches');
  }
};

export const getStandings = async (leagueId: number, season: number): Promise<Standing[]> => {
  try {
    const response = await api.get('/standings', {
      params: { league: leagueId, season }
    });
    return response.data.response[0]?.league?.standings[0] || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch standings');
  }
};