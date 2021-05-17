import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/internal/operators';
import { API_URL } from '../_helpers/url-api';
import { LoginResponse } from '../_responses/login.response';
import { MyResponse } from '../_responses/my.response';
import { User } from '../_models/user';
import { LocalStorageService } from './local-storage.service';
import { BaseResponse } from '../_responses/base.response';


const AUTH_API = API_URL + "api/Identities/";


@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private http: HttpClient,
    private tokenStorage: LocalStorageService
  ) { }

  login(username: string, password: string) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_API + 'login', {
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
    return this.tokenStorage.getUser()?.username;
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(AUTH_API + 'getProfile');
  }

  updateProfile(name: string, email: string, phone: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateProfile', {
      name: name,
      email: email,
      phone: phone
    });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(AUTH_API + 'changePassword', {
      currentPassword: currentPassword,
      newPassword: newPassword
    });
  }
}
