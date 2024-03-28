import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  firstName: string="";
  lastName: string="";
  constructor(private userService:DataService, private auth:AuthService, private data:DataService){}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.data.setUserID(response.id);
        this.firstName = response.firstName;
        this.lastName =response.lastName;
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  logout(){
    this.auth.logout()
  }
}
