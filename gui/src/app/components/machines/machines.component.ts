
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { map, takeUntil, tap, take } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

import { MachinesResponse, Machine } from './../../_models/machines.model';

// import { webSocket } from "rxjs/webSocket";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

// import { Socket } from 'phoenix';




// export const WEBSOCKET_SERVER_URI = 'ws://machinestream.herokuapp.com/api/v1/events';
export const WEBSOCKET_SERVER_URI = 'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss'],
})
export class MachinesComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  machines: Machine[] = null;

  openDropdown = false;
  showMachineType: 'both' | 'measurement' | 'microscope' = 'both';
  machineTypeOptions: any[] = [ 'both', 'measurement', 'microscope'];

  myWebSocket: WebSocketSubject<any> = webSocket( WEBSOCKET_SERVER_URI );

  initialLoad = true;


  openedMachines: any;

  constructor(
    private dataService: DataService,
  ) {

    // this.machines = [];


    this.dataService.machines
    .pipe( takeUntil( this.destroy$ ) )
    .subscribe( machines => this.machines = machines);

    this.dataService.openedMachines
    .pipe( takeUntil( this.destroy$ ) )
    .subscribe( opened => this.openedMachines = opened);


    // this.socket = io( WEBSOCKET_SERVER_URI );
    // this.socket.on('connection', () => {
    //   console.log('on connection');
    // })

    // socket.on("connect", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

  }

  ngOnInit(): void {

    interval(1000)
    .pipe()
    .subscribe(x => {
      this.dataService.getMachines()
      .pipe(
        map( res => res.data),
      )
      .subscribe(data => {
        if (this.initialLoad) {
          this.machines = data;
          this.initialLoad = false;
        }
        data.forEach(item => {
          this.machines.find(x => x.id === item.id).status = item.status;
        })
      })
    })

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  // pollMachinesUpdate() {
  //   // this.dataService.getMachines();

  //   this.dataService.getMachines()
  //   .pipe( map(res => res.data) )
  //   .subscribe( (data: Machine[]) => {
  //     console.log('--- getMachines() updates ---');
  //     console.log( data );
  //     // this.machines = data;
  //     data.forEach(item => {
  //       const machine = this.machines.find(x => x.id === item.id);
  //       machine.status = item.status;
  //     })
  //   });

  // }

  // requestDetails( itemid: string ) {
  //   this.dataService
  //   .getSingleMachine( itemid )
  //   .pipe( takeUntil( this.destroy$ ) )
  //   .subscribe(
  //     response => {
  //       console.log(`--- SINGLE MACHINE [${itemid}] ---`);
  //       console.log( response );
  //     }
  //   );
  // }


  // phoenixConnect() {

  //   console.log('--- connect to phoenix socket ---');

  //   this.phoenixSocket = new PhoenixSocket(
  //     WEBSOCKET_SERVER_URI,
  //     {
  //       params: {},
  //     }
  //   );
  //   this.phoenixSocket.connect();

  //   // Join correct channel and log events
  //   const channel = this.phoenixSocket.channel("events", {});
  //   channel.join();
  //   channel.on("new", event => {
  //     console.log(event);
  //   });
  // }

  openCloseItem( itemid: string ) {
    const openedItems = this.dataService.openedMachines.value;
    if (openedItems[itemid]) {
      delete openedItems[itemid];
    }
    else {
      openedItems[itemid] = { opened: true, data: null };
      this.dataService
      .getSingleMachine( itemid )
      .pipe( map(data => data.data) )
      .subscribe(res => {
        setTimeout(() => {
          this.dataService.openedMachineData( itemid, res );
        }, 200);
      });
    }
    this.dataService.openedMachines.next( openedItems );
    console.log( this.dataService.openedMachines.value );
  }

}
