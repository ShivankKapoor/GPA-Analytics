import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPAChartPageComponent } from './gpa-chart-page.component';

describe('GPAChartPageComponent', () => {
  let component: GPAChartPageComponent;
  let fixture: ComponentFixture<GPAChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GPAChartPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GPAChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
