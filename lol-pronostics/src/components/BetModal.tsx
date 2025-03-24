import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    border: 1px solid var(--secondary-color);
  }
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
}

const BetModal = ({ open, onClose, match, onSubmit }: BetModalProps) => {
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
        <Typography sx={{ mb: 2 }}>
          {match.team1} vs {match.team2}
        </Typography>
        <TextField
          label={match.team1}
          type="number"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={match.team2}
          type="number"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          fullWidth
          margin="normal"
        />
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
