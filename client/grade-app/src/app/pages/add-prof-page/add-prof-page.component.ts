import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiniWarningService } from '../../services/mini-warning.service';
import { DataService } from '../../services/data.service';

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
    private router: Router,
    private warning : MiniWarningService,
    private data:DataService
  ) {}

  ngOnInit(): void {
    this.data.navigated()
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
        this.router.navigate(['/add-class']);
        this.warning.openSnackBar("Professor Created!", "Dismiss")
      } catch (error) {}
    } else {
    }
  }
}
