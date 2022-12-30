import { HttpService } from "../base/services/http.service.js";
import { ProfilesService } from "./profiles.service.js";

export class ProfilesController {
  httpService;
  profilesService;

  constructor() {
    this.profilesService = new ProfilesService();
    this.httpService = new HttpService();
  }

  getProfile = (req, res) => {
    const { username } = req.params;
    const user = req.user;
    user
      ? this.profilesService.getProfileAuth(user.id, username)
        .then(profile => this.httpService.success(res, profile))
        .catch((err) => {
          if(err?.code === 404)
            return this.httpService.notFound(res);
          this.httpService.serverError(res);
        })
      : this.profilesService.getProfile(username)
        .then(profile => this.httpService.success(res, profile))
        .catch((err) => {
          if(err?.code === 404)
            return this.httpService.notFound(res);
          this.httpService.serverError(res);
        })
  }

  followProfile = (req, res) => {
    const { username } = req.params;
    const user = req.user;
    this.profilesService.followProfile(user.id, username)
      .then((profile) => this.httpService.success(res, profile))
      .catch((err) => {
        if(err?.code === 404)
          return this.httpService.notFound(res);
        this.httpService.serverError(res);
      })
  }

  unfollowProfile = (req, res) => {
    const { username } = req.params;
    const user = req.user;
    this.profilesService.unfollowProfile(user.id, username)
      .then((profile) => this.httpService.success(res, profile))
      .catch((err) => {
        if(err?.code === 404)
          return this.httpService.notFound(res);
        this.httpService.serverError(res);
      })
  }
}