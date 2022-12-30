import { BaseMiddleware } from '../base/base.middleware.js';
import { HttpService } from '../base/services/http.service.js';
import { CreateArticleDTO } from './dtos/createArticle.dto.js';

export class ArticlesMiddleware extends BaseMiddleware {
  httpService;

  constructor() {
    super();
    this.httpService = new HttpService();
  }

  createValidator = (req, res, next) => {
    const { title, description, body, tagList } = req.body.article || { undefined };
    const article = new CreateArticleDTO({ title, description, body, tagList });
    const errors = article.validate();
    errors.length
      ? this.httpService.unexpectedError(res, errors) 
      : next();
  }
}