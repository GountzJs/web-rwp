import { IProfileSchema } from '../../../shared/models/schemas/profile.schema';

export interface IProfileInfo {
  profile: IProfileSchema;
  changeFollowing: (following: boolean) => void;
}
