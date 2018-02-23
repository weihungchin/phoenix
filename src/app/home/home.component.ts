import { MatTableDataSource, MatSelectChange } from "@angular/material";
import { UserService } from "./../services/user.service";
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { AngularFireDatabase } from "angularfire2/database";
import {
  trigger,
  keyframes,
  animate,
  transition,
  style
} from "@angular/animations";
import * as kf from "./keyframes";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("panelAnimator", [
      transition("* => swipeLeft", animate(1000, keyframes(kf.slideOutLeft)))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  mobQuery: MediaQueryList;
  private mobQueryListener: () => void;
  private applicantsPath = "/applicants";
  applicantsData: any;
  isLoading = true;

  panelOpenState: boolean = false;
  animateState: string;

  mobApplicantsData = new MatTableDataSource();
  sortCriteria: any = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "mobile", value: "Mobile" }
  ];
  mobSelectedSort:any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    private ngFireDB: AngularFireDatabase,
    private userService: UserService
  ) {
    this.mobQuery = mediaMatcher.matchMedia("(max-width: 760px)");
    this.mobQueryListener = () => cdRef.detectChanges();
    this.mobQuery.addListener(this.mobQueryListener);
  }

  ngOnInit() {
    this.getApplicants(this.applicantsPath);
  }

  logout() {
    this.userService.purgeAuth().subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  private getApplicants(path) {
    this.isLoading = true;
    this.ngFireDB
      .list(path)
      .valueChanges()
      .subscribe(
        data => {
          this.applicantsData = [...data];
          this.mobApplicantsData = new MatTableDataSource([...data]);

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

  startAnimation(state, e) {
    if (!this.animateState) {
      this.animateState = state;
    }
    console.log(e);
  }

  resetAnimateState() {
    this.animateState = "";
  }

  mobApplyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.mobApplicantsData.filter = filterValue;
  }

  onDrag(e) {
    console.log(e);
  }

  onMobSort(e:MatSelectChange) {
    const sortCriteria = e.value;
    let unsortData:any = [...this.mobApplicantsData.filteredData];
    unsortData.sort(
      function(a,b) {
        return a[sortCriteria] - b[sortCriteria]
      }
    )
    this.mobApplicantsData.filteredData = [...unsortData];
    console.log(unsortData);
  }
}
