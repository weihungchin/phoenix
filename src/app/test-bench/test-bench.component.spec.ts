import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBenchComponent } from './test-bench.component';

describe('TestBenchComponent', () => {
  let component: TestBenchComponent;
  let fixture: ComponentFixture<TestBenchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBenchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
