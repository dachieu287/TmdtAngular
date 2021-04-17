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
    window.sessionStorage.clear();
  }

  public saveAuth(auth: Authentication): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, auth.token);

    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, JSON.stringify(auth.user));
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN);
  }

  getUser(): User | null {
    const user = window.sessionStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
}
