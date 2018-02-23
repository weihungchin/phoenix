import { MatSnackBar } from "@angular/material";
import { UserService } from "./../services/user.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  ElementRef
} from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from "@angular/animations";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("formFade", [
      state(
        "out",
        style({
          opacity: "0",
          paddingTop: "0px"
        })
      ),
      state(
        "in",
        style({
          opacity: "1",
          paddingTop: "30px"
        })
      ),
      transition(
        "out => in",
        animate("0.7s 200ms cubic-bezier(0.215, 0.61, 0.355, 1)")
      ),
      transition(
        "in => out",
        animate("0.7s 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19)")
      )
    ]),
    trigger("submitting", [
      state(
        "start",
        style({
          width: "100%",
          fontSize: "initial"
        })
      ),
      state(
        "done",
        style({
          width: "10px",
          fontSize: "0px",
          height: "88px",
          borderRadius: "50%",
          transform: "scale(0.5)",
          border: "2px solid #E57373",
          boxShadow: "0px 0px 15px #F06292"
        }
      )
      ),
      transition(
        "start => done",
        animate("0.3s 0s ease-in"),
      ),
      transition(
        "done => start",
        animate("0.5s 0s ease-in"),
      )
    ])
  ]
})

export class LoginComponent implements OnInit, AfterViewInit {
  disableLogin = true;
  form: FormGroup;
  formState = "out";
  submitProgress = "start";

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private elRef: ElementRef,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.buildForm();
    this.subscToFormChanges();
  }
  ngAfterViewInit() {
    this.formState = "in";
    this.cdr.detectChanges();
    this.elRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "transparent";
  }

  onSubmit(form) {
    this.submitProgress = "done";
    const formVal = Object.assign(
      {},
      {
        email: form.value.email,
        password: form.value.password
      }
    );
    this.subscToLogin(formVal);
  }

  openSnackBar(msg: string) {
    this.matSnackBar.open(msg, "", {
      verticalPosition: "top",
      announcementMessage: "hi",
      panelClass: ["error-snackbar"]
    });
  }

  private subscToLogin(formVal) {
    this.userService
      .login(formVal.email, formVal.password)
      .subscribe(
        res => this.handleLoginSuccess(res),
        err => this.handleLoginFail(err)
      );
  }
  private handleLoginFail(err) {
    this.openSnackBar(`Error : ${err.message}`);
    this.submitProgress = "start";
    console.log(err);
  }

  private handleLoginSuccess(res) {
    console.log(res);
    if (res) {
      this.router.navigate(["./home"], { relativeTo: this.activatedRoute });
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  private subscToFormChanges() {
    this.form.valueChanges.debounceTime(200).subscribe(val => {
      this.disableLogin = this.form.invalid;
      this.matSnackBar.dismiss();
    });
  }

  // tslint:disable-next-line:member-ordering
  isSubmit = false;
  // tslint:disable-next-line:member-ordering
  isDone = false;
  test() {
    this.isSubmit = true;
    setTimeout(() => {
      this.isDone = true;
      console.log(this.isDone, this.isSubmit);
    }, 500);
  }
}
