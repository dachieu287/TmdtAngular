import { Component, OnInit } from '@angular/core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


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
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password)
      .subscribe(
        data => {
          this.tokenStorage.saveAuth(data);

          this.isLoginFailed = false;
          window.location.replace("/");
        },
        error => {
          this.errorMessage = error.Message;
          this.isLoginFailed = true;
        }
      )
  }
}
