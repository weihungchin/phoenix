import { Observable } from "rxjs/Observable";
import { UserService } from "./../services/user.service";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from "@angular/router";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class LoginResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log('resolver');
     return Observable.of(true);
  //   return this.userService.isAuthenticated.take(1).map(isAuthed => {
  //     if (isAuthed) {
  //       console.log('isAuthed');
  //       this.router.navigate(["./home"], { relativeTo: this.activatedRoute });
  //     } else {
  //       console.log('isAuthed');
  //       return isAuthed;
  //     }
  //  });
  }
}
