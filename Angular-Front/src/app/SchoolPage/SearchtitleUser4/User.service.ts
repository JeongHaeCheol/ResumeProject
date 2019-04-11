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
import { User } from '../hansung.ac.kr.participants';
import { ResumeInfoUser } from '../hansung.ac.kr.assets';
import { Certificate , AwardDetails, UserInfoInEnt, UserInfoInSch, Authentication} from '../hansung.ac.kr.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UserService {

	

  private NAMESPACE: string = 'User';

  private paramUserId: string = 'targetUserId';


  constructor(
    private dataService: DataService<User>
  ) {
  };

  public getAll(): Observable<User[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getParticipant(id: any): Observable<User> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<User> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<User> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<User> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

  public getSystemQueryResumeInfoUser(param: string): Observable<ResumeInfoUser[]> {
    return this.dataService.getSystemQueryResumeInfoUser("searchResumeInfoUserById", this.paramUserId, param);
  }

  public getSystemQueryCertificate(param: string): Observable<Certificate[]> {
    return this.dataService.getSystemQueryCertificate("searchCertificateById", this.paramUserId, param);
  }
  public getSystemQueryAwardDetails(param: string): Observable<AwardDetails[]> {
    return this.dataService.getSystemQueryAwardDetails("searchAwardDetailsById", this.paramUserId, param);
  }

  public getSystemQueryUserInfoInEnt(param: string): Observable<UserInfoInEnt[]> {
    return this.dataService.getSystemQueryUserInfoInEnt("searchUserInfoInEntById", this.paramUserId, param);
  }

  public getSystemQueryUserInfoInSch(param: string): Observable<UserInfoInSch[]> {
    return this.dataService.getSystemQueryUserInfoInSch("searchUserInfoInSchById", this.paramUserId, param);
  }

  public getSystemQueryAuthentication(parameterName: string, id: string) : Observable<Authentication[]> {
    return this.dataService.getSystemQueryAuthentication("searchAuthenticationById", parameterName, id);
  }


}
