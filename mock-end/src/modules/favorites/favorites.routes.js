import { Router } from 'express';
import { FavoritesController } from "./favorites.controller.js";
import { FavoritesMiddleware } from './favorites.middleware.js';

export class FavoritesRoutes {
  controller;
  middleware;
  router;
  path;

  constructor() {
    this.controller = new FavoritesController();
    this.middleware = new FavoritesMiddleware();
    this.path = '/articles/:slug/favorite';
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.middleware.authenticate, this.controller.favorited);
    this.router.delete(this.path, this.middleware.authenticate, this.controller.unfavorited);
  }
}