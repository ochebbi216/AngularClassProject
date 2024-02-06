import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Member1Service {

  constructor( private httpClient: HttpClient) { }
  OnSave(memberToSave:any):Observable<any>{
    //generateur de requete http
    //thread observable
    return this.httpClient.post('localhost:8000/api/Member',memberToSave);

  }
}
