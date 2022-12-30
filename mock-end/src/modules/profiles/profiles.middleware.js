import { BaseMiddleware } from '../base/base.middleware.js';
import { HttpService } from '../base/services/http.service.js';
import { UsernameParamDTO } from './dtos/usernameParam.dto.js';

export class ProfilesMiddleware extends BaseMiddleware {
  httpService;

  constructor() {
    super();
    this.httpService = new HttpService();
  }

  usernameValidator = (req, res, next) => {
    const { username } = req.params || { undefined };
    const profile = new UsernameParamDTO({ username });
    const errors = profile.validate();
    errors.length
      ? this.httpService.unexpectedError(res, errors) 
      : next();
  };
}