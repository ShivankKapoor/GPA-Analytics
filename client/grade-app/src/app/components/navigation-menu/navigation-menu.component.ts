import { Component } from '@angular/core';
import { SidebarControlService } from '../../services/sidebar-control.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss',
})
export class NavigationMenuComponent {
  events: string[] = [];
  opened: boolean | undefined;
  constructor(private sidebarControlService: SidebarControlService, public userService: AuthService, private router: Router) { }
  ngOnInit() {
    this.sidebarControlService.sidebarToggle$.subscribe(() => {
      this.opened = !this.opened;
    });
  }

  logout() {
    this.userService.logout();
    this.closeMenu();
  }

  goHome() {
    this.router.navigate(['']);
    this.closeMenu();
  }

  goAdd(){
    this.router.navigate(['add-class']);
    this.closeMenu();
  }


  closeMenu() {
    this.sidebarControlService.toggleSidebar();
  }
}