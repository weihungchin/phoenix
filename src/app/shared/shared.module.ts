import { CommonModule } from "@angular/common";
import { ShowAuthedDirective } from "./show-authed.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatCardModule,
  MatSelectModule
} from "@angular/material";
import { CommonTableComponent } from "./common-table/common-table.component";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ShowAuthedDirective,
    NotFoundComponent,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    CommonTableComponent,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule
  ],
  declarations: [ShowAuthedDirective, NotFoundComponent, CommonTableComponent],
  providers: []
})
export class SharedModule {}
