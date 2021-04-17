import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../_services/token-storage.service";

@Injectable()
export class Guard implements CanActivate {
  constructor(
    private storage: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.storage.getUser();
    const isAdmin = user?.roles.indexOf('Admin') != -1;
    if (user != null && isAdmin) {
      return true;
    }

    window.location.replace('/');
    return false;
  }

}