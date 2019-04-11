import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { IpConfig } from '../IpConfig';

@Injectable()
export class CreateCardService {

   private  ipConf = new IpConfig();
   private adminUrl = this.ipConf.getIp() + ":" ;
    constructor(private dataService : DataService<JSON> ,private http : Http){
    }
    public getSystemPing(): Observable<JSON> {
        
        return this.http.get(this.adminUrl + '3000/api/system/ping', {withCredentials: true})
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }
}
