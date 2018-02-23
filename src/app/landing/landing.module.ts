import { AngularFireModule } from 'angularfire2';
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LandingComponent } from "@app/landing/landing.component";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from '@env/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const landingRouteModule = RouterModule.forChild([
  { path: "", component: LandingComponent }
]);

@NgModule({
  imports: [
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
],
  declarations: [LandingComponent],
  exports: [
      AngularFireAuthModule,
      AngularFireModule,
      AngularFireDatabaseModule
  ]
})
export class LandingModule {}
