export class LoginDTO {
  user;

  constructor(user) {
    this.user = user;
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    if(!this.user.email) errors.push('Email is required');
    if(this.user.email && !emailRegex.test(this.user.email)) errors.push('Email invalid');
    if(!this.user.password) errors.push('Password is required');
    if(this.user.password?.length < 8) errors.push('Min 8 characters');
    if(this.user.password?.length > 16) errors.push('Max 16 characters');
    return errors;
  }
}