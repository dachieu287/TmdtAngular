import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faKey, faPhone, faRedo, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../_models/profile';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  faRedo = faRedo;
  faUserTie = faUserTie;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  
  form: FormGroup;
  profile: Profile;

  constructor(
    private authServive: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getProfile();

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])
    });
  }

  getProfile(): void {
    this.authServive.getProfile().subscribe(
      response => {
        this.profile = response.data;
        this.username.setValue(this.profile.username);
        this.name.setValue(this.profile.name);
        this.email.setValue(this.profile.email);
        this.phone.setValue(this.profile.phone);
      }
    )
  }

  onSubmit() {
    this.authServive.updateProfile(this.name.value, this.email.value, this.phone.value)
      .subscribe(
        response => {
          alert(response.message);
        }
      )
  }

  get username() {
    return this.form.get('username');
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
}
