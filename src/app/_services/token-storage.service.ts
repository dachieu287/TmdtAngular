import { Injectable } from '@angular/core';
import { Authentication } from '../_models/authentication';
import { User } from '../_models/user';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logout(): void {
    window.localStorage.clear();
  }

  public saveAuth(auth: Authentication): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, auth.token);

    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(auth.user));
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  getUser(): User | null {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
}
