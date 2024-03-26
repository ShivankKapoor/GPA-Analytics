import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class-page',
  templateUrl: './add-class-page.component.html',
  styleUrls: ['./add-class-page.component.scss']
})
export class AddClassPageComponent implements OnInit {
  myForm!: FormGroup; 
  professors: string[] = [];
  semesters: string[] = [];
  selectedProfId: number | undefined;
  selectedSemId: number | undefined;
  
  constructor(private fb: FormBuilder, private data:DataService,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subject: ['', Validators.required],
      number: ['', Validators.required],
      professor: ['', Validators.required],
      semester: ['', Validators.required],
      hours: ['', Validators.required],
      classDesc: ['', Validators.required]
    });

    this.loadProfessorsAndSemesters();
  }

  async loadProfessorsAndSemesters() {
    try {
      const semsArray = await this.data.getAllSems().toPromise();
      for (let i = 0; i < semsArray.semesters.length; i++) {
        const element = semsArray.semesters[i];
        const displayString = (element.season + " " + element.year);
        this.semesters.push(displayString);
      }

      const profsArray = await this.data.getAllProfs().toPromise();
      for (let i = 0; i < profsArray.professors.length; i++) {
        const element = profsArray.professors[i];
        const displayString = element.lastName;
        this.professors.push(displayString);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  testClick(){
    console.log("Clicked")
  }

  async onSubmit() {
    if (this.myForm.valid) {
      var profId;
      var semId;

      try {
        const semsArray = await this.data.getAllSems().toPromise();
        for (let i = 0; i < semsArray.semesters.length; i++) {
          const element = semsArray.semesters[i];
          const displayString = (element.season + " " + element.year);
          if (displayString == this.myForm.value.semester) {
            this.selectedSemId = element.id;
            semId=this.selectedSemId;
            break; 
          }
        }

        const profsArray = await this.data.getAllProfs().toPromise();
        for (let i = 0; i < profsArray.professors.length; i++) {
          const element = profsArray.professors[i];
          const displayString = element.lastName;
          if (displayString == this.myForm.value.professor) {
            this.selectedProfId = element.id;
            profId=this.selectedProfId;
            break;
          }
        }

        const newClass={
          subject:this.myForm.value.subject,
          number:this.myForm.value.number,
          profID:profId,
          semID:semId,
          hours:this.myForm.value.hours,
          classDesc:this.myForm.value.classDesc
        };

        console.log(newClass);

        try {
          const response = await this.http.post<any>('http://localhost:3000/create-class', newClass).toPromise();
          console.log('Class successful:', response);
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Class Creation failed:', error);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}
