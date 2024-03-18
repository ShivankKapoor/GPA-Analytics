import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { StringFormattingService } from '../../services/string-formatting.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  username: string = '';
  password: string = '';
  retypedPassword: string = '';
  showPasswordValue: boolean = false;

  constructor(
    private router: Router,
    private str: StringFormattingService
  ) {}

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }

  async register() {
  }
}
