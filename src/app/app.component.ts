import { UserService } from "@app/services";
import { Component } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  constructor(private userService: UserService, private router: Router) {
    this.userService.attemptAuth();
    this.subscToRouterEvent();
  }

  private subscToRouterEvent() {
    this.router.events.subscribe(event => this.handleRouterEvent(event));
  }

  private handleRouterEvent(e) {
    if (e instanceof NavigationEnd) {
      // console.log(e);
    }
    if (e instanceof NavigationError) {
      // redirect to 404 page;
      console.log(e);
      this.router.navigateByUrl('404');
    }
    if (e instanceof NavigationCancel) {
      console.log(e);
    }
  }
}
