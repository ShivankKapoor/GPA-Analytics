import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-class-page',
  templateUrl: './add-class-page.component.html',
  styleUrl: './add-class-page.component.scss'
})
export class AddClassPageComponent implements OnInit {
  myForm!: FormGroup; 
  professors: string[] = [];
  semesters: string[] = [];

  constructor(private fb: FormBuilder, private data:DataService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subject: ['', Validators.required],
      number: ['', Validators.required],
      professor: ['', Validators.required],
      semester: ['', Validators.required],
      hours: ['', Validators.required],
      classDesc: ['', Validators.required]
    });
    this.data.getAllSems().subscribe((semsArray)=>{
      console.log(semsArray.semesters)
      for (let i = 0; i < semsArray.semesters.length; i++) {
        const element = semsArray.semesters[i];
        const displayString = (element.season+" "+element.year)
        this.semesters.push(displayString)
      }
    })

    this.data.getAllProfs().subscribe((profsArray)=>{
      console.log(profsArray.professors)
      for (let i = 0; i < profsArray.professors.length; i++) {
        const element = profsArray.professors[i];
        const displayString = (element.lastName)
        this.professors.push(displayString)
      }
    })
  }

  onSubmit() {
    if (this.myForm.valid) {

      console.log(this.myForm.value);

    }
  }
}