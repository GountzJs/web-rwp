import { Router } from "express";
import { ArticlesController } from "./articles.controller.js";
import { ArticlesMiddleware } from "./articles.middleware.js";

export class ArticlesRoutes {
  controller;
  middleware;
  path;
  router;

  constructor() {
    this.controller = new ArticlesController();
    this.middleware = new ArticlesMiddleware();
    this.path = '/articles';
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.path, this.middleware.authenticateOptional, this.controller.getGlobal);
    this.router.post(this.path, this.middleware.authenticate, this.middleware.createValidator, this.controller.create);
    this.router.get(this.path + '/:slug', this.middleware.authenticateOptional, this.controller.getArticle);
    this.router.put(this.path + '/:slug', this.middleware.authenticate, this.controller.editArticle);
  }
}