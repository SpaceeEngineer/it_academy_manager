import { IRole } from './IRole';

export interface IRoleRepository {
  getOneById(id: number): Promise<IRole>;
}
