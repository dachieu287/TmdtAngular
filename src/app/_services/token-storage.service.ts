import { Injectable } from '@angular/core';
import { Auhtentication } from '../_models/authentication';

const AUTH_TOKEN = "auth-token";
const AUTH_USERNAME = "auth-username";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
  }

  public saveAuth(auth: Auhtentication): void {
    window.sessionStorage.removeItem(AUTH_TOKEN);
    window.sessionStorage.setItem(AUTH_TOKEN, auth.token);

    window.sessionStorage.removeItem(AUTH_USERNAME);
    window.sessionStorage.setItem(AUTH_USERNAME, auth.username);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(AUTH_TOKEN);
  }

  getUsername(): string | null {
    return window.sessionStorage.getItem(AUTH_USERNAME);
  }
}
