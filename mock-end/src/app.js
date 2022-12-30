import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { ArticlesRoutes } from './modules/articles/articles.routes.js';
import { FavoritesRoutes } from './modules/favorites/favorites.routes.js';
import { ProfilesRoutes } from './modules/profiles/profiles.routes.js';
import { UsersRoutes } from './modules/users/users.routes.js';

export class App {
  app;

  constructor() {
    this.app = express();
    this.initConfig();
    this.initController();
    this.initServer();
  }

  initConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ origin: '*' }));
  }

  initController() {
    const routes = [new UsersRoutes(), new ProfilesRoutes(), new ArticlesRoutes(), new FavoritesRoutes()]
    routes.map(route => this.app.use('/api', route.router));
  }

  initServer() {
    this.app.listen(Number(process.env.PORT), String(process.env.HOST), () => {
      console.log(`Server running on port: http://${String(process.env.HOST)}:${Number(process.env.PORT)}/`);
    });
  }
}