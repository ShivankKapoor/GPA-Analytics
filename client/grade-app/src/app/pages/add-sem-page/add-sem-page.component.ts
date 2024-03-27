import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sem-page',
  templateUrl: './add-sem-page.component.html',
  styleUrls: ['./add-sem-page.component.scss']
})
export class AddSemPageComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      season: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  async onSubmit() {
    if (this.myForm.valid) {
      const newSem={
        season:this.myForm.value.season,
        year:this.myForm.value.year
      }
      try{
        const response = await this.http.post<any>('http://localhost:3000/create-sem', newSem).toPromise();
        this.router.navigate(['/'])
      }catch(error){

      }
    } else {

    }
  }
}
