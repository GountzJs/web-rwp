export class UsernameParamDTO {
  profile;

  constructor(profile) {
    this.profile = profile;
  }

  validate() {
    const { username } = this.profile;
    const errors = [];
    if(!username) errors.push('Username is required');
    if(username?.length < 4) errors.push('Username min 4 characters');
    if(username?.length > 25) errors.push('Username máx 25 characters');
    return errors;
  }
}