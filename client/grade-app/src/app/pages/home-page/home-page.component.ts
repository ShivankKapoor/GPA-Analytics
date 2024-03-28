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
        this.data.setfirstName(response.firstName)
        this.data.setLastName(response.lastName)
        if(response.lastName==null){
          this.auth.logout()
        }
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
