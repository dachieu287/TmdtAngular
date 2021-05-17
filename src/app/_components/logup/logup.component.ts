import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faKey, faPhone, faRedo, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { IdentityService } from 'src/app/_services/identity.service';

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
    private authService: IdentityService
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
    this.authService.logup(this.f.username.value, this.f.password.value, this.f.name.value, this.f.email.value, this.f.phone.value)
      .subscribe();
    
    this.isSuccess = true;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
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
