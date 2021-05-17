import { Injectable } from '@angular/core';
import { LoginResponse } from '../_responses/login.response';
import { User } from '../_models/user';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  logout(): void {
    window.localStorage.clear();
  }

  public saveIdentity(response: LoginResponse): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, response.token);

    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(response.user));
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  getUser(): User | null {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
}
