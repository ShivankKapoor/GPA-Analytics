import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SidebarControlService } from '../../services/sidebar-control.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {

  constructor(public authService:AuthService, private sidebarControlService:SidebarControlService, public data:DataService){}


  toggleSidebar() {
    this.sidebarControlService.toggleSidebar();
  }

  logout(){
    this.authService.logout()
  }
}
