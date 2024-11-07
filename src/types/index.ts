export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag?: string;
  season: number;
  round?: string;
}

export interface Fixture {
  id: number;
  date: string;
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goals;
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  form: string;
  description?: string;
}