

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Machine } from './_models/machines.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

private internalApiUrl: string = environment.internalApiUrl;


    openedMachines: BehaviorSubject<any> = new BehaviorSubject<any>( {} );

    machines: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>( [] );


    constructor(
        private http: HttpClient,
    ) { }


    getHealth(): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/health`);
    }

    getMachines(): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/machines`);
    }

    getSingleMachine( itemid: string ): Observable<any> {
        return this.http.get<any>(`${this.internalApiUrl}/machines/${itemid}`);
    }

    openedMachineData( machineid: string, data ) {
        const item = this.openedMachines.value[machineid];
        item.data = data;
    }

}

