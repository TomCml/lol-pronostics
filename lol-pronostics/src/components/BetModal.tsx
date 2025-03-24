import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamCode } from '../types';
import logosData from '../assets/logos.json';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: 1px solid var(--secondary-color);
  }
`;

const StyledButton = styled(Button)`
  background-color: var(--secondary-color);
  color: var(--text-color);
  &:hover {
    background-color: var(--primary-color);
  }
`;

const TeamContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const TeamLogo = styled('img')`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

interface BetModalProps {
  open: boolean;
  onClose: () => void;
  match: {
    id: number;
    team1: string;
    team2: string;
  };
  onSubmit: (score1: number, score2: number) => void;
  team1Logo: string | null;
  team2Logo: string | null;
}

const BetModal = ({ open, onClose, match, onSubmit, team1Logo, team2Logo }: BetModalProps) => {
  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');

  const handleSubmit = () => {
    const score1Num = parseInt(score1);
    const score2Num = parseInt(score2);
    
    if (!isNaN(score1Num) && !isNaN(score2Num)) {
      onSubmit(score1Num, score2Num);
      setScore1('');
      setScore2('');
      onClose();
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>Pronostiquer le match</DialogTitle>
      <DialogContent>
        <TeamContainer>
          {team1Logo && <TeamLogo src={team1Logo} alt={match.team1} />}
          <TextField
            label={match.team1}
            type="number"
            value={score1}
            onChange={(e) => setScore1(e.target.value)}
            fullWidth
          />
        </TeamContainer>
        <TeamContainer>
          {team2Logo && <TeamLogo src={team2Logo} alt={match.team2} />}
          <TextField
            label={match.team2}
            type="number"
            value={score2}
            onChange={(e) => setScore2(e.target.value)}
            fullWidth
          />
        </TeamContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Annuler</Button>
        <StyledButton onClick={handleSubmit} variant="contained">
          Valider
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default BetModal;
