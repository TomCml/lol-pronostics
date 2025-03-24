import { Table as MuiTable, TableBody, TableContainer } from '@mui/material';
import { TableHeader } from './TableHeader';
import { StyledPaper } from '../../../components/common/Table/StyledTableComponents';
import { TableColumn } from '../../../types/table';

interface CustomTableProps<T> {
  columns: TableColumn[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
}

export const CustomTable = <T extends {}>({ columns, data, renderRow }: CustomTableProps<T>) => {
  return (
    <TableContainer component={StyledPaper}>
      <MuiTable>
        <TableHeader columns={columns} />
        <TableBody>
          {data.map((item, index) => renderRow(item, index))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
