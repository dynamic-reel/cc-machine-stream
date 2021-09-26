

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AuthenticationService } from '@app/_services';
// import { environment } from '@environments/environment';
import { environment } from 'src/environments/environment';
// import { User, UserBasic } from '@global/_models/user/';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Machine, MachinesResponse } from './_models/machines.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

//   private internalApiUrl: string = environment.internalApiUrl;
private internalApiUrl: string = environment.internalApiUrl;


//   optionalExceptionsListColumns: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

//   searchResponseHead: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   exceptionsList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

//   searchParams: BehaviorSubject<any> = new BehaviorSubject<any>({ search: null, no_scan: true, no_remediation: false });

//   itemsPerPage: BehaviorSubject<number> = new BehaviorSubject<number>( 25 );
//   currentPage: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );

//   createNewException: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
//   newExceptionData: BehaviorSubject<any> = new BehaviorSubject<any>( null );

//   exceptionsDataLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );


//   private subject = new Subject<any>();

    openedMachines: BehaviorSubject<any> = new BehaviorSubject<any>( {} );

    machines: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>( [] );


    constructor(
        private http: HttpClient,
        // private authenticationService: AuthenticationService,
    ) { }


//   // sendClickEvent() {
//   //   this.subject.next();
//   // }
//   // getClickEvent(): Observable<any>{
//   //   return this.subject.asObservable();
//   // }

//   startSearch() {
//     this.subject.next();
//   }
//   getStartSearch(): Observable<any> {
//     return this.subject.asObservable();
//   }


    getHealth(): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/health`);
    }

    getMachines(): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/machines`);
    }

    // getMachines() {
    //     this.http.get<any>(`${this.internalApiUrl}/machines`)
    //     .pipe(
    //         tap(data => console.log(data)),
    //         // map( res => res.data)
    //     )
    //     // .subscribe(res => this.machines.next( res.data ));
    //     .subscribe(res => {
    //         res.data.map(item => {
    //             //
    //         });
    //         this.machines.next( res.data );
    //     });
    // }

    getSingleMachine( itemid: string ): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/machines/${itemid}`);
    }

    openedMachineData( machineid: string, data ) {
        const item = this.openedMachines.value[machineid];
        item.data = data;
    }

//   // getExceptions( gid: string, params: any ): Observable<any> {
//   getExceptions(): Observable<any> {
//     const params = {
//       ...this.searchParams.value,
//       itemsPerPage: this.itemsPerPage.value,
//       page: this.currentPage.value,
//       gid: this.authenticationService.userSubject.value.username,
//     }
//     return this.http.post<any>(`${this.internalApiUrl}/exceptions/list`, params);
//   }

//   // searchExceptions( searchparams: any ): Observable<any> {
//   //   return this.http.post<any>(`${this.internalApiUrl}/exceptions/search`, searchparams);
//   // }

//   newException( data: any ): Observable<any> {
//     return this.http.post<any>(`${this.internalApiUrl}/exceptions/new`, data);
//   }

//   editException( itemid: string | number, data: any ): Observable<any> {
//     return this.http.post<any>(`${this.internalApiUrl}/exceptions/edit/${itemid}`, data);
//   }

}

