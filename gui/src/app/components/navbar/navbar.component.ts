
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Output() profile: EventEmitter<any> = new EventEmitter<any>();

  profileOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openCloseProfile() {
    // console.log(`this.profileOpen: ${this.profileOpen}`);
    this.profileOpen = !this.profileOpen;
    this.profile.emit( this.profileOpen );
  }

}
