import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-class-page',
  templateUrl: './add-class-page.component.html',
  styleUrl: './add-class-page.component.scss'
})
export class AddClassPageComponent implements OnInit {
  myForm!: FormGroup; 
  professors: string[] = ['Professor 1', 'Professor 2', 'Professor 3'];
  semesters: string[] = ['Spring', 'Summer', 'Fall'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subject: ['', Validators.required],
      number: ['', Validators.required],
      professor: ['', Validators.required],
      semester: ['', Validators.required],
      hours: ['', Validators.required],
      classDesc: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {

      console.log(this.myForm.value);

    }
  }
}