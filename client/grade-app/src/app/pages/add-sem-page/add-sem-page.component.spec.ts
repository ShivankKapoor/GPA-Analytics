import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSemPageComponent } from './add-sem-page.component';

describe('AddSemPageComponent', () => {
  let component: AddSemPageComponent;
  let fixture: ComponentFixture<AddSemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSemPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
