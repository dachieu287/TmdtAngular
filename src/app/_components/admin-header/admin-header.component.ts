import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IdentityService } from 'src/app/_services/identity.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  faUser = faUser;
  username: string;

  constructor(
    private authService: IdentityService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    window.location.replace('/');
  }
}
