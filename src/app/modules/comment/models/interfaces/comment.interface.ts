import { ICommentSchema } from '../../../shared/models/schemas/comment.schema';

export interface IComment {
  slug: string;
  comment: ICommentSchema;
  username?: string | null;
  removeComment: (id: number) => void;
}
