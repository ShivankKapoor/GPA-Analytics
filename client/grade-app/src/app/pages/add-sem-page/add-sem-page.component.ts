import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sem-page',
  templateUrl: './add-sem-page.component.html',
  styleUrls: ['./add-sem-page.component.scss']
})
export class AddSemPageComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      season: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {

    } else {

    }
  }
}
