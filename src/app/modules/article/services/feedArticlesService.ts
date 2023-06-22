import { httpClient } from '../../shared/http/httpClient';
import { IArticlesSchema } from '../../shared/models/schemas/articles.schema';

export function feedArticlesService(
  limit: number,
  offset: number
): Promise<IArticlesSchema> {
  const queryParams = `?limit=${limit}&offset=${offset}`;
  return httpClient<IArticlesSchema>(`articles/feed${queryParams}`, 'GET');
}
