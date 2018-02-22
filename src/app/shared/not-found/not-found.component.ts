import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"]
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#363636';
  }
}
