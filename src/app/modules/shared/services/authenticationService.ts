import { IUserSchema } from '../models/schemas/user.schema';

export function authenticationService(user: IUserSchema) {
  sessionStorage.setItem('token', user.token);
  sessionStorage.setItem('username', user.username);
  sessionStorage.setItem('image', user.image);
}
