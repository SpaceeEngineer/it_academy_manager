import { IUser } from './IUser';

export interface IUserPagination {
  items: IUser[];

  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };

  links?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
