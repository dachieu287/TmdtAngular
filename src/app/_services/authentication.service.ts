import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/internal/operators';
import { API_URL } from '../_helpers/url-api';
import { TokenStorageService } from './token-storage.service';


const AUTH_API = API_URL + "api/Authenticate/";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  login(username: string, password: string) : Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: username,
      password: password
    });
  }

  logup(username: string, password: string, name: string, email: string, phone: string): Observable<any> {
    return this.http.post(AUTH_API + 'logup', {
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone
    });
  }

  logout(): void {
    this.tokenStorage.logout();
  }

  checkUsernameExists(username : string): Observable<boolean> {
    return this.http.get<boolean>(AUTH_API + 'checkUsernameExists', { params: {
      username: username
    }}).pipe(delay(1000));
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkUsernameExists(control.value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }

  isLogin(): boolean {
    return this.tokenStorage.getToken() !== null
  }

  getUsername(): string {
    return this.tokenStorage.getUsername();
  }
}
