import { User } from "../_models/user";

export class LoginResponse {
  constructor(
    public succeeded: boolean,
    public token: string,
    public user: User,
  ) { }
}