import { BaseMiddleware } from "../base/base.middleware.js";
import { HttpService } from "../base/services/http.service.js";
import { EditUserDTO } from "./dtos/editUser.dto.js";
import { LoginDTO } from "./dtos/login.dto.js";
import { RegisterDTO } from "./dtos/register.dto.js";

export class UsersMiddleware extends BaseMiddleware {
  httpService;

  constructor() {
    super();
    this.httpService = new HttpService();
  }

  registerValidator = (req, res, next) => {
    const { email, username, password } = req.body?.user || { undefined };
    const user = new RegisterDTO({ email, username, password });
    const errors = user.validate();
    errors.length
      ? this.httpService.unexpectedError(res, errors) 
      : next();
  };

  loginValidator = (req, res, next) => {
    const { email, password } = req.body?.user || { undefined };
    const user = new LoginDTO({ email, password });
    const errors = user.validate();
    errors.length
      ? this.httpService.unexpectedError(res, errors) 
      : next();
  };

  editValidator = (req, res, next) => {
    const { email, username ,bio ,image , password } = req.body?.user || { undefined };
    const user = new EditUserDTO({ email, username, bio, image, password });
    const errors = user.validate();
    errors.length
      ? this.httpService.unexpectedError(res, errors) 
      : next();
  }
}