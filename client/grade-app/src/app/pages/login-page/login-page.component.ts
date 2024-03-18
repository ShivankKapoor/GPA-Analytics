import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StringFormattingService } from '../../services/string-formatting.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  showPasswordValue: boolean = false;
  constructor(
    private str: StringFormattingService,

    private router: Router,
  ) {}

  async login() {
    
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
