import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)`
  background-color: var(--secondary-color);
  color: var(--text-color);
  &:hover {
    background-color: var(--primary-color);
    border: 1px solid var(--secondary-color);
  }
`;
