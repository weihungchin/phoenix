import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad
} from "@angular/router";
import "rxjs/add/operator/take";
import { Route } from "@angular/compiler/src/core";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // console.log("auth guard");
    this.userService.isAuthenticated.subscribe(res => {
    });
    return this.userService.isAuthenticated.take(1).map(
      res => {
        console.log(res);
        return res;
      }
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.userService.isAuthenticated.take(1);
  }
}
