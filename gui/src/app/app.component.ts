
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'gui';

  profileOpen = false;

  constructor(
    private dataService: DataService,
  ) {


    this.dataService.getHealth().subscribe(response => {
      console.log('health');
      console.log( response );
    })

  }

  profileOpenChange( status: boolean ) {
    // console.log(`profileOpenChange: ${status}`);
    this.profileOpen = status;
  }

}
