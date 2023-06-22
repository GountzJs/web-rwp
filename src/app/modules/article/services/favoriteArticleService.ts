import { httpClient } from '../../shared/http/httpClient';
import { IArticleSchema } from '../../shared/models/schemas/article.schema';

export function favoriteArticleService(
  slug: string
): Promise<{ article: IArticleSchema }> {
  return httpClient<{ article: IArticleSchema }>(
    `articles/${slug}/favorite`,
    'POST',
    {}
  );
}
