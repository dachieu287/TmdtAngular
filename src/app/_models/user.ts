export class User {
  constructor(
    public username: string,
    public name: string,
    public email: string,
    public phone: string,
    public roles: string[]
  ) {}
}