/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../hansung.ac.kr.participants';
import 'rxjs/Rx';
import { CreateAuthentication, RevokeRequestUser } from '../hansung.ac.kr.transaction';
import { Authentication } from '../hansung.ac.kr.assets';

// Can be injected into a constructor
@Injectable()
export class OrganizationService {

	
		private NAMESPACE: string = 'Organization';
    private NAMESPACE2: string = 'Authentication';
    private NAMESPACE3: string = 'RevokeRequestUser';



    constructor(
      private dataService: DataService<Organization>,
      private dataService2: DataService<Authentication>,
      private dataService3: DataService<RevokeRequestUser>

    ) {
    };

    public getAll(): Observable<Organization[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Organization> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Organization> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }
  
    public updateAuthentication(id: any, itemToUpdate: any): Observable<Authentication> {
      return this.dataService2.update(this.NAMESPACE2, id, itemToUpdate);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Authentication> {
      return this.dataService2.update(this.NAMESPACE2, id, itemToUpdate);
    }

    public revokeRequestUser(itemToAdd: any): Observable<RevokeRequestUser> {
      return this.dataService3.add(this.NAMESPACE3, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Organization> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Organization> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public getSystemPing(): Observable<JSON> {
      return this.dataService.getSystemPing();
    }

    public getSingle(id: string): Observable<Organization> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }


}
