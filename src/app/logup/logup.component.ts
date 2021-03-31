import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faKey, faPhone, faRedo, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  faRedo = faRedo;
  faUserTie = faUserTie;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  form: FormGroup;

  isSuccess = false;
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)], this.authService.usernameValidator()),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[\s\S]{6,}$/), 
        Validators.pattern(/\d/), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/), Validators.pattern(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/)]),
      repassword: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])
    }, {
      validators: this.checkPasswords
    });
  }

  onSubmit(): void {
    this.authService.logup(this.username.value, this.password.value, this.name.value, this.email.value, this.phone.value)
      .subscribe();
    
    this.isSuccess = true;
    this.form.reset();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get repassword() {
    return this.form.get('repassword');
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('repassword').value;

    if (password !== confirmPassword) {
      group.controls['repassword'].setErrors({ notSame: true });
      return { }
    }
    return null;
  }
}
