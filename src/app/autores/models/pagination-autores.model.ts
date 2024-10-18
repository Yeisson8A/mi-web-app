import { Autor } from './autor.model';

export interface PaginationAutores {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Autor[];
  filterValue: {};
  totalRows: number;
}
