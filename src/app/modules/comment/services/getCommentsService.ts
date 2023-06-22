import { httpClient } from '../../shared/http/httpClient';
import { ICommentSchema } from '../../shared/models/schemas/comment.schema';

export function getCommentsService(
  slug: string
): Promise<{ comments: ICommentSchema[] }> {
  return httpClient<{ comments: ICommentSchema[] }>(
    `articles/${slug}/comments`,
    'GET'
  );
}
