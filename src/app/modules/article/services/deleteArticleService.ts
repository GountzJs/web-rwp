import { httpClient } from '../../shared/http/httpClient';

export function deleteArticleService(slug: string): Promise<null> {
  return httpClient<null>(`articles/${slug}`, 'DELETE');
}
