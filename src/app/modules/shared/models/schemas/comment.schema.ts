import { IProfileSchema } from './profile.schema';

export interface ICommentSchema {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: IProfileSchema;
}
