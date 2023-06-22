import { httpClient } from '../../shared/http/httpClient';
import { IArticleSchema } from '../../shared/models/schemas/article.schema';

export function getArticleService(
  slug: string
): Promise<{ article: IArticleSchema }> {
  return httpClient<{ article: IArticleSchema }>(`articles/${slug}`, 'GET');
}
