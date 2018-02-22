import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  mobQuery: MediaQueryList;
  private mobQueryListener: () => void;
  private applicantsPath = "/applicants";
  applicantsData: any;
  isLoading = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    private ngFireDB: AngularFireDatabase
  ) {
    this.mobQuery = mediaMatcher.matchMedia("(max-width: 768px)");
    this.mobQueryListener = () => cdRef.detectChanges();
    this.mobQuery.addListener(this.mobQueryListener);
  }

  ngOnInit() {
    this.getApplicants(this.applicantsPath);
  }
  private getApplicants(path) {
    this.isLoading = true;
    this.ngFireDB
      .list(path)
      .valueChanges()
      .subscribe(
        data => {
          this.applicantsData = [...data];
           this.isLoading = false;
        },
        err => {
          console.log(err);
        }
      );
  }
  ngOnDestroy() {
    this.mobQuery.removeListener(this.mobQueryListener);
  }
}
