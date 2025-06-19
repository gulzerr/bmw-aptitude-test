// Define generic types for our data grid
export interface GridColumn {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filter?: boolean;
  resizable?: boolean;
}

export interface FilterOption {
  type: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'isEmpty';
  value?: string;
  field: string;
}

export interface SearchParams {
  searchTerm: string;
  filters: FilterOption[];
}
