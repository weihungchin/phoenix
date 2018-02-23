import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "@app/models";

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject
    .asObservable()
    .distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private ngFireAuth: AngularFireAuth, private router: Router) {}

  login(email, password): Observable<any> {
    return this.emailLogin(email, password).map(res =>
      this.handleAuthUser(res)
    );
  }

  updateUserProfile() {
    // this.ngFireAuth.auth.currentUser.updateProfile({displayName:'', photoURL:''})
  }

  private emailLogin(email, password): Observable<any> {
    return Observable.fromPromise(
      this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  // call this once in app.component.ts only
  attemptAuth() {
    this.ngFireAuth.authState.subscribe(
      res => this.handleAuthUser(res),
      err => {
        console.log(err);
      }
    );
  }

  purgeAuth(): Observable<any> {
   return this.logout().map(res => {
      this.currentUserSubject.next(new User());
      this.isAuthenticatedSubject.next(false);
      return res;
    });
  }

  private logout() {
    return Observable.fromPromise(this.ngFireAuth.auth.signOut());
  }

  private handleAuthUser(res) {
    if (res) {
      console.log(res);
      this.router.navigateByUrl("home");
      const user = this.toUserVO(res);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.router.navigateByUrl("login");
      this.isAuthenticatedSubject.next(false);
    }
  }

  private toUserVO(res) {
    const user = new User();
    user.email = res.email;
    user.photoUrl = res.photoUrl;
    user.name = res.displayName;
    return user;
  }
}
