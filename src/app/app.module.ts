import { LoginResolver } from "./login/login-resolver.service";
import { SharedModule } from "@app/shared";
import { UserService, AuthGuard } from "@app/services";
import { environment } from "@env/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { TestBenchComponent } from "./test-bench/test-bench.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NotFoundComponent } from "@app/shared/not-found/not-found.component";
import { ServiceWorkerModule } from "@angular/service-worker";

const rootRoute = RouterModule.forRoot(
  [
    { path: "login", component: LoginComponent },
    {
      path: "home",
      loadChildren: "./home/home.module#HomeModule",
      canLoad: [AuthGuard]
    },
    { path: "404", component: NotFoundComponent }
  ],
  { useHash: false }
);

@NgModule({
  declarations: [AppComponent, TestBenchComponent, LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    environment.production
      ? ServiceWorkerModule.register("/ngsw-worker.js", {
          enabled: environment.production
        })
      : [],
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    rootRoute,
    SharedModule
  ],
  providers: [UserService, AuthGuard, LoginResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
