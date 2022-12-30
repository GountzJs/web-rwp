import { Router } from 'express';
import { UsersController } from './users.controller.js';
import { UsersMiddleware } from './users.middleware.js';

export class UsersRoutes {
  router;
  controller;
  middleware;

  constructor() {
    this.middleware = new UsersMiddleware();
    this.controller = new UsersController();
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/user', this.middleware.authenticate, this.controller.getUser);
    this.router.put('/user', this.middleware.authenticate, this.middleware.editValidator, this.controller.editUser);
    this.router.post('/users', this.middleware.registerValidator, this.controller.singUp);
    this.router.post('/users/login', this.middleware.loginValidator, this.controller.singIn);
  }
}