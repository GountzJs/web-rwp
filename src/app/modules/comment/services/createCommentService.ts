import { httpClient } from '../../shared/http/httpClient';
import { ICommentSchema } from '../../shared/models/schemas/comment.schema';

export function createCommentService(
  slug: string,
  body: string
): Promise<{ comment: ICommentSchema }> {
  return httpClient<{ comment: ICommentSchema }>(
    `articles/${slug}/comments`,
    'POST',
    { comment: { body } }
  );
}
