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
import { AwardDetails, Authentication } from '../hansung.ac.kr.assets';
import 'rxjs/Rx';
import { CreateAwardDetails } from '../hansung.ac.kr.transaction';

// Can be injected into a constructor
@Injectable()
export class AwardDetailsService {

	
		private NAMESPACE: string = 'AwardDetails';
    private NAMESPACE2: string = 'CreateAwardDetails';
    private NAMESPACE3: string = 'Authentication';


    constructor(
      private dataService: DataService<AwardDetails>,
      private dataService2: DataService<CreateAwardDetails>,
      private dataService3: DataService<Authentication>
    ) {
    };

    public getAll(): Observable<AwardDetails[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<AwardDetails> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<AwardDetails> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public addTransaction(itemToAdd: any): Observable<CreateAwardDetails> {
      return this.dataService2.add(this.NAMESPACE2, itemToAdd);

    }

    public updateAsset(id: any, itemToUpdate: any): Observable<AwardDetails> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<AwardDetails> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public deleteAsset2(id: any): Observable<Authentication> {
      return this.dataService3.delete(this.NAMESPACE3, id);
    }


    public getSystemPing(): Observable<JSON> {
      return this.dataService.getSystemPing();
    }

    public getSystemQueryAwardDetails(parameterName: string, id: string) : Observable<AwardDetails[]> {
      return this.dataService.getSystemQueryAwardDetails("searchAwardDetailsById", parameterName, id);
    }


    public getSystemQueryAuthentication(parameterName: string, id: string) : Observable<Authentication[]> {
      return this.dataService.getSystemQueryAuthentication("searchAuthenticationById", parameterName, id);
    }


}
