import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { IpConfig } from '../IpConfig';


@Injectable()
export class CreateUserService {

    private ipConf = new IpConfig();
    private baseUrl =  this.ipConf.getIp() + ":";
    private adminUrl= this.baseUrl + '3001/api/';
    private multiUrl= this.baseUrl + '3000/api/';
    constructor(private http : HttpClient){
    }

 
    public addParticipant(itemToAdd: any) {
        console.log(itemToAdd);
        return this.http.post(this.adminUrl +'User', itemToAdd).toPromise();
    }

    public issueParticipant( identity : any ){
        return this.http.post(this.adminUrl +'system/identities/issue',identity, {responseType: 'blob'}).toPromise();
    }

    public importCard(cardData, userId : string){
        const file = new File([cardData], userId +'.card', {type:'application/octet-stream', lastModified:Date.now()});
        const formData = new FormData();
        formData.append('card',file);
        const headers = new HttpHeaders();
        headers.set('Content-Type','multipart/form-data');
        return this.http.post(this.multiUrl + 'wallet/import', formData , {withCredentials : true , headers}).toPromise();
    }
    
}
