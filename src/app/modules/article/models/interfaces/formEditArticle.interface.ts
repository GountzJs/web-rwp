import { IArticleSchema } from '../../../shared/models/schemas/article.schema';

export interface IFormEditArticle {
  article: IArticleSchema;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}
