import { TableCell, TableRow, Paper, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)`
  color: var(--text-color);
  border-bottom: 1px solid var(--secondary-color);
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

export const StyledPaper = styled(Paper)`
  background-color: var(--primary-color);
  color: var(--text-color);
`;

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
