import { TableHead, TableRow } from '@mui/material';
import { StyledTableCell } from '../../../components/common/Table/StyledTableComponents';

interface Column {
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

interface TableHeaderProps {
  columns: Column[];
}

export const TableHeader = ({ columns }: TableHeaderProps) => (
  <TableHead>
    <TableRow>
      {columns.map((column, index) => (
        <StyledTableCell 
          key={index}
          align={column.align}
          style={column.width ? { width: column.width } : undefined}
        >
          {column.label}
        </StyledTableCell>
      ))}
    </TableRow>
  </TableHead>
);
