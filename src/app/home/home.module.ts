import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../services/auth-guard.service';
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";

const HomeRoute = RouterModule.forChild([
  { path: "", pathMatch: "full", component: HomeComponent, canActivate: [AuthGuard]}
]);

@NgModule({
  imports: [
      HomeRoute,
      SharedModule,
      CommonModule
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
