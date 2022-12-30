import { v4 } from 'uuid';
import { DatabaseService } from '../base/services/database.service.js';
import { JwtService } from '../base/services/jwt.service.js';

export class UsersService {
  database;
  jwtService;

  constructor() {
    this.database = new DatabaseService();
    this.jwtService = new JwtService();
  }

  async singIn(email, password) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.email === email);
    if(!user) throw { code: 422, error: ['Email or password wrong'] };
    if(user.password !== password) throw { code: 422, error: ['Email or password wrong'] };
    const { username, bio, image } = user;
    const token = this.jwtService.sing({ user: { id: user.id, email, username, bio, image }});
    return { user: { email, username, bio, image, token } };
  }

  async singUp(email, username, password) {
    const { users } = await this.database.read('users', 'users');
    if(users.some(user => user.email === email)) throw { code: 422, error: ['Email in use'] };
    if(users.some(user => user.username === username)) throw { code: 422, error: ['Username in use'] };
    const bio = 'Bio of example';
    const image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
    const id = v4();
    users.push({ id, email, username, password, bio, image });
    await this.database.edit('users', 'users', { users });
    const token = this.jwtService.sing({ user: { id, email, username, bio, image }});
    return { user: { email, username, bio, image, token } };
  }

  async getUser(id) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.id === id);
    const { email, username, bio, image } = user;
    const token = this.jwtService.sing({ user: { id, email, username, bio, image }});
    return { user: { email, username, bio, image, token } };
  }

  async editUser(id, userEdit) {
    const { email, username, password, bio, image } = userEdit || { undefined };
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.id === id);
    if(!user) throw { code: 500 };
    if(email && user.email !== email && users.some(us => us.email === email))
      throw { code: 422, error: ['Email in use'] };
    if(username && user.username !== username && users.some(us => us.username === username))
      throw { code: 422, error: ['Username in use'] };
    user.email = email ?? user.email;
    user.username = username || user.username;
    user.password = password || user.password;
    user.bio = bio ?? user.bio;
    user.image = image ?? user.image;
    await this.database.edit('users', 'users', { users });
    const token = this.jwtService.sing({ user: { id, email: user.email, username: user.username, bio: user.bio, image: user.image }});
    return { user: { email: user.email, username: user.username, bio: user.bio, image: user.image, token } };
  }
}