import { httpClient } from '../../shared/http/httpClient';
import { IArticleSchema } from '../../shared/models/schemas/article.schema';

export function createArticleService(
  title: string,
  description: string,
  body: string,
  tagList: string[]
): Promise<{ article: IArticleSchema }> {
  return httpClient<{ article: IArticleSchema }>('articles', 'POST', {
    article: { title, description, body, tagList },
  });
}
