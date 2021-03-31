import { Component, OnInit } from '@angular/core';

import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  username: string;
  isLogin = false;

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.tokenStorage.getToken() != null;
    this.username = this.isLogin ? this.tokenStorage.getUsername() : '-';
  }

  logout(): void {
    this.tokenStorage.logout();
    window.location.replace('/');
  }
}
