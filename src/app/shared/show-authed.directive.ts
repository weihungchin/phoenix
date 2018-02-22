import { UserService } from "@app/services";
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  Input
} from "@angular/core";

// tslint:disable-next-line:directive-selector
@Directive({ selector: "[showAuthed]" })
export class ShowAuthedDirective implements OnInit {
  condition: boolean;
  constructor(
    private templateRef: TemplateRef<any>,
    private vcontainerRef: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isAuthed => {
      if ((isAuthed && this.condition) || (!isAuthed && !this.condition)) {
        this.vcontainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.vcontainerRef.clear();
      }
    });
  }

  @Input()
  set showAuthed(condition: boolean) {
    this.condition = condition;
  }
}
