import axios from 'axios';

const API_BASE_URL = "https://pronomodo.vbilla.fr";

export const api = {
  signin: (modo: string) => 
    axios.post(`${API_BASE_URL}/signin`, null, { params: { modo } }),

  getCompetitions: () => 
    axios.get(`${API_BASE_URL}/competitions`),

  getMatches: (competition: number) => 
    axios.get(`${API_BASE_URL}/matches`, { params: { competition } }),

  placeBet: (modo: number, gameid: number, score1: number, score2: number) => 
    axios.post(`${API_BASE_URL}/bet`, null, { 
      params: { modo, gameid, score1, score2 } 
    }),

  getBets: (modo: number) => 
    axios.get(`${API_BASE_URL}/bets`, { params: { modo } }),

  getRanking: (competition: number) => 
    axios.get(`${API_BASE_URL}/ranking`, { params: { competition } }),

  getTeamLogo: (team: string) =>
    axios.get(`${API_BASE_URL}/logo`, { params: { team } })
};
