import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { api } from '../services/api';
import { useUser } from '../context/UserContext';
import { CompetitionList } from '../components/competitions/CompetitionList';
import { MatchList } from '../components/matches/MatchList';
import BetModal from '../components/BetModal';
import { leaguepediaApi } from '../services/leaguepediaApi';
import { Competition, Match, TeamLogos } from '../types';
import styled from 'styled-components';
import { Loader } from '../components/common/Loader';

const StyledContainer = styled(Container)`
  height: calc(100vh - 80px); // 80px corresponds to the header height
  overflow: hidden;
`;

const Home = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedMatchLogos, setSelectedMatchLogos] = useState<{ team1: string | null, team2: string | null }>({ team1: null, team2: null });
  const { userId } = useUser();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.getCompetitions();
        setCompetitions(response.data);
        if (response.data.length > 0) {
          setSelectedCompetition(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch competitions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedCompetition) return;
      try {
        const response = await api.getMatches(selectedCompetition);
        setMatches(response.data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      }
    };
    fetchMatches();
  }, [selectedCompetition]);

  const handleBetSubmit = async (score1: number, score2: number) => {
    if (!userId || !selectedMatch) return;
    
    try {
      await api.placeBet(userId, selectedMatch.id, score1, score2);
      if (selectedCompetition) {
        const response = await api.getMatches(selectedCompetition);
        setMatches(response.data);
      }
    } catch (error) {
      console.error('Failed to place bet:', error);
    }
  };

  const handleMatchSelect = (match: Match, team1Logo: string | null, team2Logo: string | null) => {
    setSelectedMatch(match);
    setSelectedMatchLogos({ team1: team1Logo, team2: team2Logo });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <StyledContainer maxWidth={false}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <CompetitionList
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            onSelectCompetition={setSelectedCompetition}
          />
        </Grid>
        <Grid item xs={9}>
          <MatchList
            matches={matches}
            onMatchSelect={(match, team1Logo, team2Logo) => handleMatchSelect(match, team1Logo, team2Logo)}
          />
        </Grid>
      </Grid>
      
      {selectedMatch && (
        <BetModal
          open={!!selectedMatch}
          onClose={() => setSelectedMatch(null)}
          match={selectedMatch}
          onSubmit={handleBetSubmit}
          team1Logo={selectedMatchLogos.team1}
          team2Logo={selectedMatchLogos.team2}
        />
      )}
    </StyledContainer>
  );
};

export default Home;
