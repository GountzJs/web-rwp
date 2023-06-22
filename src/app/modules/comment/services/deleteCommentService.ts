import { httpClient } from '../../shared/http/httpClient';

export function deleteCommentService(slug: string, id: number): Promise<null> {
  return httpClient<null>(`articles/${slug}/comments/${id}`, 'DELETE');
}
