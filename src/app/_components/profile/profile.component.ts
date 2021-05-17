import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faPhone, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/_models/user';
import { IdentityService } from 'src/app/_services/identity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faUser = faUser;
  faUserTie = faUserTie;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  
  form: FormGroup;
  profile: User;

  constructor(
    private authServive: IdentityService
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
  
  get f() {
    return this.form.controls;
  }

  getProfile(): void {
    this.authServive.getProfile().subscribe(
      response => {
        this.profile = response;
        this.f.username.setValue(this.profile.username);
        this.f.name.setValue(this.profile.name);
        this.f.email.setValue(this.profile.email);
        this.f.phone.setValue(this.profile.phone);
      }
    )
  }

  onSubmit() {
    this.authServive.updateProfile(this.f.name.value, this.f.email.value, this.f.phone.value)
      .subscribe(
        response => {
          alert(response.message);
        }
      )
  }

}
