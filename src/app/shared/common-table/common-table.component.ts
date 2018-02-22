import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges
} from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-common-table",
  templateUrl: "./common-table.component.html",
  styleUrls: ["./common-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ["name", "mobile", "email", "action"];
  dataSource: MatTableDataSource<UserData>;
  isLoadingResults = true;

  sample = {
    key: "id"
  };

  @Input("data")
  set data(val) {
    if (val && val.length > 0) {
      this.dataSource = new MatTableDataSource(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  @Input("title")
  title: any = [
    { key: "id", label: "ID" },
    { key: "progress", label: "Progress" },
    { key: "name", label: "Name" },
    { key: "color", label: "Color" },
    { key: "mobile", label: "Mobile" },
    { key: "email", label: "Email" }
  ];

  @Input("isLoading")
  set isLoading(val) {
    this.isLoadingResults = val;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // // Create 100 users
    // const users: UserData[] = [];
    // for (let i = 1; i <= 100; i++) {
    //   users.push(createNewUser(i));
    // }
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {}

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     " " +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     ".";

//   return {
//     id: id.toString(),
//     name: name,
//     mobile: "03" + Math.round(Math.random() * 56783219).toString(),
//     // progress: Math.round(Math.random() * 100).toString(),
//     // color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
//     email: name.split(" ").join("_") + "@tech.com"
//   };
// }

// /** Constants used to fill up our data base. */
// const COLORS = [
//   "maroon",
//   "red",
//   "orange",
//   "yellow",
//   "olive",
//   "green",
//   "purple",
//   "fuchsia",
//   "lime",
//   "teal",
//   "aqua",
//   "blue",
//   "navy",
//   "black",
//   "gray"
// ];
// const NAMES = [
//   "Maia",
//   "Asher",
//   "Olivia",
//   "Atticus",
//   "Amelia",
//   "Jack",
//   "Charlotte",
//   "Theodore",
//   "Isla",
//   "Oliver",
//   "Isabella",
//   "Jasper",
//   "Cora",
//   "Levi",
//   "Violet",
//   "Arthur",
//   "Mia",
//   "Thomas",
//   "Elizabeth"
// ];

export interface UserData {
  id: string;
  name: string;
  mobile: string;
  email: string;
}
