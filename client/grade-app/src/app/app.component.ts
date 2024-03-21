import { Component } from '@angular/core';
import { ApiInitService } from './services/api-init.service';
import { MiniWarningService } from './services/mini-warning.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GPA-Analytics';
constructor(private apiCheck:ApiInitService, private miniWarn:MiniWarningService){}
  async ngOnInit(){
    if(await this.apiCheck.checkAPI()){
      console.log("API Connected")
    }else{
      console.log("API not found")
      this.miniWarn.openSnackBar("Not connected to the internet","Close")
    }
    
  }
}
