import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HomeComponent } from './components/home/home.component';
import { MachinesComponent } from './components/machines/machines.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReadmeComponent } from './components/readme/readme.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { MachinesFilterPipe } from './pipes/machines.filter.pipe';
import { MachineDetailsComponent } from './components/machine-details/machine-details.component';

// import { Phoenix } from 'phoenix';

const customComponents = [
  HomeComponent,
  MachinesComponent,
  NavbarComponent,
  ReadmeComponent,
  MachineDetailsComponent,
  FourOFourComponent,
];

@NgModule({
  declarations: [
    AppComponent,
   ...customComponents,
   MachinesFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
