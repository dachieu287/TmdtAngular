import { Component, OnInit } from '@angular/core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdentityService } from 'src/app/_services/identity.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;

  form: any = {
    username: null,
    password: null
  };

  errorMessage = '';

  isLoginFailed = false;
  
  constructor(
    private authService: IdentityService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password)
      .subscribe(
        response => {
          if (response.succeeded) {
            this.localStorage.saveIdentity(response);
            this.isLoginFailed = false;
            let isAdmin = response.user.roles.indexOf('Admin') != -1;
            if (isAdmin) {
              window.location.replace('/admin');
            }
            else {
              window.location.replace("/");
            }
          }
          else {
            this.isLoginFailed = true;
            this.errorMessage = "Tên tài khoản hoặc mật khẩu không chính xác";
          }  
        },
      )
  }
}
