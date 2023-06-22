import { IUserSchema } from '../../../shared/models/schemas/user.schema';

export interface IFormSettings {
  user: IUserSchema;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}
