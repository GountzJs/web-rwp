import { DatabaseService } from "../base/services/database.service.js";

export class ProfilesService {
  database;

  constructor() {
    this.database = new DatabaseService();
  }

  async getProfileAuth(id, username) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.username === username);
    if(!user) throw { code: 404 };
    const userToken = users.find( us => us.id === id);
    if(!userToken) throw { code: 500 };
    const  { userProfiles } = await this.database.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usrPrf => usrPrf.user === userToken.id && usrPrf.profile === user.id);
    const { bio, image } = user;
    return { profile: { username, bio, image, following: userProfile?.following ?? false }};
  }

  async getProfile(username) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find( us => us.username === username);
    if(!user) throw { code: 404 };
    const { bio, image } = user;
    return { profile: { username, bio, image, following: false }};
  }

  async followProfile(id, username) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.username === username);
    if(!user) throw { code: 404 };
    const { userProfiles } = await this.database.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usrPrf => usrPrf.user === id && usrPrf.profile === user.id);
    const { bio, image } = user;
    if(!userProfile) {
      userProfiles.push({ user: id, profile: user.id, following: true });
      await this.database.edit('profiles', 'userProfiles', { userProfiles });
    } else if(!userProfile.following) {
      userProfile.following = true;
      await this.database.edit('profiles', 'userProfiles', { userProfiles });
    }
    return { profile: { username, bio, image, following: true }};
  }

  async unfollowProfile(id, username) {
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.username === username);
    if(!user) throw { code: 404 };
    const { userProfiles } = await this.database.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usrPrf => usrPrf.user === id && usrPrf.profile === user.id);
    const { bio, image } = user;
    if(userProfile?.following) {
      userProfile.following = false;
      await this.database.edit('profiles', 'userProfiles', { userProfiles });
    }
    return { profile: { username, bio, image, following: false }};
  }
}