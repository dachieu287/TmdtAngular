import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faKey, faLockOpen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { IdentityService } from 'src/app/_services/identity.service';

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
    private authService: IdentityService
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

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.authService.changePassword(this.f.currentPassword.value, this.f.password.value)
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
}
