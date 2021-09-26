import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MachineDetails } from 'src/app/_models/machines.model';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss'],
})
export class MachineDetailsComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  @Input('data') data: MachineDetails;

  showData = false;


  constructor() { }

  ngOnInit(): void {

    setTimeout(() => this.showData = true);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.warn(`details [${this.data.id}] destroyed`);
  }

}
