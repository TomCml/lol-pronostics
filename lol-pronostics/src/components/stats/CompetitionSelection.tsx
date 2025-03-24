import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition } from '../../types';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 24px;
  min-width: 200px;
  
  .MuiInputLabel-root {
    color: var(--text-color);
  }
  
  .MuiOutlinedInput-root {
    color: var(--text-color);
    fieldset {
      border-color: var(--secondary-color);
    }
    &:hover fieldset {
      border-color: var(--secondary-color);
    }
  }
`;

interface CompetitionSelectionProps {
  competitions: Competition[];
  selectedCompetition: number | null;
  onSelectCompetition: (id: number) => void;
}

export const CompetitionSelection = ({
  competitions,
  selectedCompetition,
  onSelectCompetition
}: CompetitionSelectionProps) => (
  <StyledFormControl>
    <InputLabel>Compétition</InputLabel>
    <Select
      value={selectedCompetition || ''}
      label="Compétition"
      onChange={(e) => onSelectCompetition(e.target.value as number)}
    >
      {competitions.map((comp) => (
        <MenuItem key={comp.id} value={comp.id}>
          {comp.name}
        </MenuItem>
      ))}
    </Select>
  </StyledFormControl>
);
