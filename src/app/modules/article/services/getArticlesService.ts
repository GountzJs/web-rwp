import { httpClient } from '../../shared/http/httpClient';
import { IArticlesSchema } from '../../shared/models/schemas/articles.schema';

export function getArticlesService(
  limit: number,
  offset: number,
  author?: string,
  favorited?: string,
  tag?: string
): Promise<IArticlesSchema> {
  let queryParams = `?limit=${limit}&offset=${offset}`;
  if (author) queryParams = queryParams + `&author=${author}`;
  if (favorited) queryParams = queryParams + `&favorited=${favorited}`;
  if (tag) queryParams = queryParams + `&tag=${tag}`;
  return httpClient<IArticlesSchema>(`articles${queryParams}`, 'GET');
}
