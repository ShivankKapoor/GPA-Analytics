import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SidebarControlService } from '../../services/sidebar-control.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {

  constructor(public authService:AuthService, private sidebarControlService:SidebarControlService){}


  toggleSidebar() {
    this.sidebarControlService.toggleSidebar();
  }
}
