import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faKey, faLockOpen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  faLockOpen = faLockOpen;
  faKey = faKey;
  faRedo = faRedo;

  form: FormGroup;
  
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[\s\S]{6,}$/), 
        Validators.pattern(/\d/), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/), Validators.pattern(/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/)]),
      repassword: new FormControl(''),
    }, {
      validators: this.checkPasswords
    });
  }

  onSubmit() {
    this.authService.changePassword(this.currentPassword.value, this.password.value)
      .subscribe(response => {
        alert(response.message);
      })
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

  get password() {
    return this.form.get('password');
  }

  get repassword() {
    return this.form.get('repassword');
  }

  get currentPassword() {
    return this.form.get('currentPassword');
  }
}
