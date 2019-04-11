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
import { UserInfoInEnt, Authentication } from '../hansung.ac.kr.assets';
import 'rxjs/Rx';
import { CreateUserInfoInEnt } from '../hansung.ac.kr.transaction';

// Can be injected into a constructor
@Injectable()
export class UserInfoInEntService {

	
		private NAMESPACE: string = 'UserInfoInEnt';
	  private NAMESPACE2: string = 'CreateUserInfoInEnt';
    private NAMESPACE3: string = 'Authentication';


    constructor(
      private dataService: DataService<UserInfoInEnt>,
      private dataService2: DataService<CreateUserInfoInEnt>,
      private dataService3: DataService<Authentication>
    ) {
    };

    public getAll(): Observable<UserInfoInEnt[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<UserInfoInEnt> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<UserInfoInEnt> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }


    public addTransaction(itemToAdd: any): Observable<CreateUserInfoInEnt> {
      return this.dataService2.add(this.NAMESPACE2, itemToAdd);

    }

    public updateAsset(id: any, itemToUpdate: any): Observable<UserInfoInEnt> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<UserInfoInEnt> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public deleteAsset2(id: any): Observable<Authentication> {
      return this.dataService3.delete(this.NAMESPACE3, id);
    }
    
    public getSystemPing(): Observable<JSON> {
      return this.dataService.getSystemPing();
    }

    public getSystemQueryUserInfoInEnt(parameterName: string, id: string) : Observable<UserInfoInEnt[]> {
      return this.dataService.getSystemQueryUserInfoInEnt("searchUserInfoInEntById", parameterName, id);
    }


    public getSystemQueryAuthentication(parameterName: string, id: string) : Observable<Authentication[]> {
      return this.dataService.getSystemQueryAuthentication("searchAuthenticationById", parameterName, id);
    }

}
