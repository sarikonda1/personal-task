import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbReportComponent } from './ulb-report.component';

describe('UlbReportComponent', () => {
  let component: UlbReportComponent;
  let fixture: ComponentFixture<UlbReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlbReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
