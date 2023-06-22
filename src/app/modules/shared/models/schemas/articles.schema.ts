import { IArticleSchema } from './article.schema';

export interface IArticlesSchema {
  articles: IArticleSchema[];
  articlesCount: number;
}
