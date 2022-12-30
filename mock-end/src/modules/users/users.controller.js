import { HttpService } from '../base/services/http.service.js';
import { UsersService } from './users.service.js';

export class UsersController {
  usersService;
  httpService;

  constructor() {
    this.usersService = new UsersService();
    this.httpService = new HttpService();
  }

  singIn = (req, res) => {
    const { email, password } = req.body.user;
    this.usersService.singIn(email, password)
      .then(user => this.httpService.success(res, user))
      .catch(err => {
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error);
        this.httpService.serverError(res);
      });
  }

  singUp = (req, res) => {
    const { email, username, password } = req.body.user;
    this.usersService.singUp(email, username, password)
      .then(user => this.httpService.created(res, user))
      .catch(err => {
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error);
        this.httpService.serverError(res);
      });
  }

  getUser = (req, res) => {
    const user = req.user;
    this.usersService.getUser(user.id)
      .then(user => this.httpService.success(res, user))
      .catch(err => {
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error);
        this.httpService.serverError(res);
      });
  }

  editUser = (req, res) => {
    const user = req.user;
    this.usersService.editUser(user.id, req.body.user)
      .then(user => this.httpService.success(res, user))
      .catch(err => {
        if(err.code === 422)
          return this.httpService.unexpectedError(res, err.error);
        this.httpService.serverError(res);
      });
  }
}