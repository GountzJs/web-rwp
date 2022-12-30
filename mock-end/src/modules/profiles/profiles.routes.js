import { Router } from "express";
import { ProfilesController } from "./profiles.controller.js";
import { ProfilesMiddleware } from "./profiles.middleware.js";

export class ProfilesRoutes {
  router;
  controller;
  middleware;
  path;

  constructor() {
    this.middleware = new ProfilesMiddleware();
    this.controller = new ProfilesController();
    this.path = '/profiles/:username';
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      this.path,
      this.middleware.authenticateOptional,
      this.middleware.usernameValidator,
      this.controller.getProfile
    );
    this.router.post(
      this.path + '/follow',
      this.middleware.authenticate,
      this.middleware.usernameValidator,
      this.controller.followProfile
    );
    this.router.delete(
      this.path + '/follow',
      this.middleware.authenticate,
      this.middleware.usernameValidator,
      this.controller.unfollowProfile
    );
  }
}