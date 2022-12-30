import { HttpService } from "./services/http.service.js";
import { JwtService } from "./services/jwt.service.js";

export class BaseMiddleware {
  httpService;
  jwtService;

  constructor() {
    this.httpService = new HttpService();
    this.jwtService = new JwtService();
  }

  authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token || token.slice(0, 7) !== 'Bearer ')
      return this.httpService.unauthorized(res);
    this.jwtService.verify(token?.slice(7))
      .then(payload => {
        req.user = JSON.parse(JSON.stringify(payload)).user;
        next();
      })
      .catch(() => this.httpService.unauthorized(res))
  }

  authenticateOptional = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
      req.user = null;
      return next();
    }
    if(token.slice(0, 7) !== 'Bearer ') 
      return this.httpService.unauthorized(res);
    this.jwtService.verify(token?.slice(7))
      .then(payload => {
        req.user = JSON.parse(JSON.stringify(payload)).user;
        next();
      })
      .catch(() => this.httpService.unauthorized(res))
  }
}