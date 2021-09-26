
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// import { webSocket } from "rxjs/webSocket";


@Injectable()
export class AppService {


  URL_API: string = 'https://machinestream.herokuapp.com/api/v1/';


  constructor(
    private http: HttpService,
  ) {}


  getHello(): string {
    return 'Hello World ...!';
  }


  getMachines(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/machines`);
  }

  getSingleMachine( itemid: string ): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/machines/${itemid}`);
  }

}
