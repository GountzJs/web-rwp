export class EditUserDTO {
  user;

  constructor(user) {
    this.user = user;
  }

  validate() {
    const { email, username, password, bio } = this.user || { undefined };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    if(bio?.length < 4) errors.push('Bio min 4 characters');
    if(bio?.length > 120) errors.push('Bio max 120 characters');
    if(email?.length && !emailRegex.test(email)) errors.push('Email invalid');
    if(username?.length < 4) errors.push('Username min 4 characters');
    if(username?.length > 25) errors.push('Username máx 25 characters');
    if(password?.length && password.length < 8) errors.push('Password min 8 characters');
    if(password?.length > 16) errors.push('Password máx 16 characters');
    return errors;
  }
}