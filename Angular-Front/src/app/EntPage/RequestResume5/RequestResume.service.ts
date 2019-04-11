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
import { Organization, Enterprise, School } from '../hansung.ac.kr.participants';
import 'rxjs/Rx';
import { CreateAuthentication, RevokeRequestUser } from '../hansung.ac.kr.transaction';
import { Authentication } from '../hansung.ac.kr.assets';

// Can be injected into a constructor
@Injectable()
export class RequestResumeService {


  private NAMESPACE_ORGANIZATION: string = 'Organization';
  private NAMESPACE_ENTERPRISE: string = 'Enterprise';
  private NAMESPACE_SCHOOL: string = 'School';
  private NAMESPACE_AUTHENTICATION: string = 'Authentication';
  private NAMESPACE_REVOKE_REQUESTUSER: string = 'RevokeRequestUser';



  constructor(
    private dataServiceOrg: DataService<Organization>,
    private dataServiceEnt: DataService<Enterprise>,
    private dataServiceSch: DataService<School>,
    private dataServiceAuth: DataService<Authentication>,
    private dataServiceRevoke: DataService<RevokeRequestUser>

  ) {
  };

  public getAllOrg(): Observable<Organization[]> {
    return this.dataServiceOrg.getAll(this.NAMESPACE_ORGANIZATION);
  }

  public getAllEnt(): Observable<Enterprise[]> {
    return this.dataServiceEnt.getAll(this.NAMESPACE_ENTERPRISE);
  }

  public getAllSch(): Observable<School[]> {
    return this.dataServiceSch.getAll(this.NAMESPACE_SCHOOL);
  }


  public getOrg(id: any): Observable<Organization> {
    return this.dataServiceOrg.getSingle(this.NAMESPACE_ORGANIZATION, id);
  }

  public getEnt(id: any): Observable<Enterprise> {
    return this.dataServiceEnt.getSingle(this.NAMESPACE_ENTERPRISE, id);
  }

  public getSch(id: any): Observable<School> {
    return this.dataServiceSch.getSingle(this.NAMESPACE_SCHOOL, id);
  }

  
  public updateAsset(id: any, itemToUpdate: any): Observable<Authentication> {
    return this.dataServiceAuth.update(this.NAMESPACE_AUTHENTICATION, id, itemToUpdate);
  }

  public revokeRequestUser(itemToAdd: any): Observable<RevokeRequestUser> {
    return this.dataServiceRevoke.add(this.NAMESPACE_REVOKE_REQUESTUSER, itemToAdd);
  }

 
  public getSystemPing(): Observable<JSON> {
    return this.dataServiceAuth.getSystemPing();
  }



}
