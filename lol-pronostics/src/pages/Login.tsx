import { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { api } from '../services/api';

const StyledButton = styled(Button)`
  background-color: var(--secondary-color);
  &:hover {
    background-color: var(--primary-color);
  }
`;

const StyledContainer = styled(Container)`
  background-color: var(--background-color);
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (username.trim()) {
      try {
        const response = await api.signin(username.trim());
        if (response.status === 200) {
          setUser(username.trim(), response.data.id);
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Login failed:', error);
        setError('Échec de la connexion. Veuillez réessayer.');
      }
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Entrez votre pseudo
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Pseudo"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </StyledButton>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default Login;
