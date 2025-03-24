import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { api } from '../services/api';

const CompetitionDetails = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!id) return;
      try {
        const response = await api.getMatches(parseInt(id));
        setMatches(response.data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Matches du jour
      </Typography>
      <Grid container spacing={3}>
        {/* Matches list will go here */}
      </Grid>
    </Container>
  );
};

export default CompetitionDetails;
