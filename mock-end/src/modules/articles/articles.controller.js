import { HttpService } from "../base/services/http.service.js";
import { ArticlesService } from "./articles.service.js";

export class ArticlesController {
  articlesService;
  httpService;

  constructor() {
    this.articlesService = new ArticlesService();
    this.httpService = new HttpService();
  }
 
  getGlobal = (req, res) => {
    const { limit = '20', offset = '0', author, favorited } = req.query || { undefined };
    const user = req.user;
    this.articlesService.getGlobal(user?.id, Number(limit), Number(offset), author, favorited, null)
      .then(response => this.httpService.success(res, response))
      .catch(err => {
        console.log(err);
        this.httpService.serverError(res);
      });
  }

  create = (req, res) => {
    const user = req.user;
    const { title, description, body, tagList } = req.body.article || { undefined };
    this.articlesService.created(user.id, title, description, body, tagList)
      .then((article) => this.httpService.success(res, { article }))
      .catch((err) => {
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error);
        this.httpService.serverError(res);
      });
  }

  getArticle = (req, res) => {
    const user = req.user;
    const { slug } = req.params;
    user
      ? this.articlesService.getArticleAuth(user.id, slug)
          .then((article) => this.httpService.success(res, { article }))
          .catch(err => {
            if(err.code === 404)
              return this.httpService.notFound(res);
            this.httpService.serverError(res);
          })
      : this.articlesService.getArticle(slug)
          .then((article) => this.httpService.success(res, { article }))
          .catch(err => {
            if(err.code === 404)
              return this.httpService.notFound(res);
            this.httpService.serverError(res);
          });
  }

  editArticle = (req, res) => {
    const user = req.user;
    const { slug } = req.params;
    this.articlesService.editArticle(user.id, slug, req.body.article)
      .then(article => this.httpService.success(res, { article }))
      .catch(err => {
        if(err.code === 404)
          return this.httpService.notFound(res);
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error); 
        this.httpService.serverError(res);
      });
  }
}