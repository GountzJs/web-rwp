import { httpClient } from '../../shared/http/httpClient';
import { IArticleSchema } from '../../shared/models/schemas/article.schema';

export function editArticleService(
  slug: string,
  title: string,
  description: string,
  body: string
): Promise<{ article: IArticleSchema }> {
  return httpClient<{ article: IArticleSchema }>(`articles/${slug}`, 'PUT', {
    article: { title, description, body },
  });
}
