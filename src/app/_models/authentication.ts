import { User } from "./user";

export class Authentication {
  constructor(
    public token: string,
    public user: User,
  ) { }
}