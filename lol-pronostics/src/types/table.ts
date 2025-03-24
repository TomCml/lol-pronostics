export interface TableColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  format?: (value: any) => string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}
