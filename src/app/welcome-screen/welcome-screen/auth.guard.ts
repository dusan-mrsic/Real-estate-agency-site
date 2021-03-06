import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LogRegService } from "./LogRegAddEstateService.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LogRegService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuth();
    if (!isAuth) {
      this.router.navigate(['']);
    }
    return isAuth;
  }
}
