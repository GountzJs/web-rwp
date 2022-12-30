export class RegisterDTO {
  user;

  constructor(user) {
    this.user = user;
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    if(!this.user.email) errors.push('Email is required');
    if(this.user.email && !emailRegex.test(this.user.email)) errors.push('Email invalid');
    if(!this.user.username) errors.push('Username is required');
    if(this.user.username?.length < 4) errors.push('Username min 4 characters');
    if(this.user.username?.length > 25) errors.push('Username máx 25 characters');
    if(!this.user.password) errors.push('Password is required');
    if(this.user.password?.length < 8) errors.push('Password min 8 characters');
    if(this.user.password?.length > 16) errors.push('Password máx 16 characters');
    return errors;
  }
}