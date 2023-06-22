import { ICommentSchema } from '../../../shared/models/schemas/comment.schema';

export interface IFormComment {
  slug: string;
  image: string;
  addComment: (cmt: ICommentSchema) => void;
}
