import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassPageComponent } from './add-class-page.component';

describe('AddClassPageComponent', () => {
  let component: AddClassPageComponent;
  let fixture: ComponentFixture<AddClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
