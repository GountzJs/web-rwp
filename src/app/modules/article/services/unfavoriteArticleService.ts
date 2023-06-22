import { httpClient } from '../../shared/http/httpClient';
import { IArticleSchema } from '../../shared/models/schemas/article.schema';

export function unfavoriteArticleService(
  slug: string
): Promise<{ article: IArticleSchema }> {
  return httpClient<{ article: IArticleSchema }>(
    `articles/${slug}/favorite`,
    'DELETE'
  );
}
