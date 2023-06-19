import { IRole } from './IRole';

export interface IRoleService {
  getRoleById(id: number): Promise<IRole>;
}
