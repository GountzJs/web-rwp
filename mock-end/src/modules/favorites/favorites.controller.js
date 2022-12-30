import { HttpService } from '../base/services/http.service.js';
import { FavoritesService } from './favorites.service.js';

export class FavoritesController {
  httpService;
  favoritesService;

  constructor() {
    this.httpService = new HttpService();
    this.favoritesService = new FavoritesService();
  }

  favorited = (req, res) => {
    const user = req.user;
    const { slug } = req.params;
    this.favoritesService.favorited(user.id, slug)
      .then(article => this.httpService.success(res, { article }))
      .catch(err => {
        if(err?.code === 404) 
          return this.httpService.notFound(res);
        this.httpService.serverError(res);
      })
  }

  unfavorited = (req, res) => {
    const user = req.user;
    const { slug } = req.params;
    this.favoritesService.unfavorited(user.id, slug)
      .then(article => this.httpService.success(res, { article }))
      .catch(err => {
        if(err?.code === 404) 
          return this.httpService.notFound(res);
        this.httpService.serverError(res);
      });
  }
}