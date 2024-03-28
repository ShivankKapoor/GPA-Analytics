import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prof-page',
  templateUrl: './add-prof-page.component.html',
  styleUrl: './add-prof-page.component.scss',
})
export class AddProfPageComponent {
  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      professorName: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.myForm.valid) {
      const newProf = {
        lastName: this.myForm.value.professorName,
      };

      try {
        const response = await this.http
          .post<any>('http://localhost:3000/create-prof', newProf)
          .toPromise();
        this.router.navigate(['/']);
      } catch (error) {}
    } else {
    }
  }
}
