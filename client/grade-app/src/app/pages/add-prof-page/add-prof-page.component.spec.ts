import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfPageComponent } from './add-prof-page.component';

describe('AddProfPageComponent', () => {
  let component: AddProfPageComponent;
  let fixture: ComponentFixture<AddProfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
