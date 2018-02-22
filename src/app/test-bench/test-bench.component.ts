import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import {} from "firebaseApp";

@Component({
  selector: "app-test-bench",
  templateUrl: "./test-bench.component.html",
  styleUrls: ["./test-bench.component.scss"]
})
export class TestBenchComponent implements OnInit {
  dataObs: Observable<any[]>;

  constructor(
    private ngFireDb: AngularFireDatabase,
    public ngFireAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.dataObs = this.getDbData("/courses");
  }

  getDbData(listPath): Observable<any[]> {
    return this.ngFireDb.list(listPath).valueChanges();
  }

  login() {
    this.ngFireAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.ngFireAuth.auth.signOut();
  }

  signUp(email, password) {
    this.ngFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err);
      });
  }
}
