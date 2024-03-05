import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from 'src/app/app-config';
@Injectable({
  providedIn: 'root'
})
export class Member1Service {
  tab: any[] = global._db.members;
  constructor(private httpClient: HttpClient) { }
  OnSave(memberToSave: any): Observable<any> {
    //generateur de requete http
    //thread observable
    // return this.httpClient.post('localhost:8000/api/Member',memberToSave);
    const Member1 = {
      ...memberToSave, //... pour extracter les attributs
      id: Math.ceil(Math.random() * 1000).toString(), //ceil pour forsage de type
      createdDate: new Date().toUTCString()
    }
    this.tab.push(Member1);//ajout le membre dans le table des membres
    return new Observable(observer => observer.next())
  }

  Ondelete(id: string): Observable<any> {
    this.tab = this.tab.filter(item => item.id != id);
    return new Observable(observer => observer.next())

  }

  getMemberById(id: string): Observable<any> {
    // return this.httpClient.get<any>("http://localhost:3000/api/Members/"+id);
    return new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null
    ))
  }
  // updateMember(id: string, data: any): Observable<any> {
  //   let index = this.tab.findIndex((item) => item.id === id);
  //   if (index != -1) {
  //     this.tab[index] = { ...this.tab[index], ...data };
  //     return new Observable(observer => observer.next(true));
  //   } else { 
  //     return new Observable(observer => observer.error('Error')) 
  //   }

  // }
  updateMember(id: string , data : any ): Observable <any>{
    const index =this.tab.findIndex(item=>item.id==id)
    this.tab[index]={id:id,...data,createdDate:new Date().toISOString()}
    return new Observable(observer=>observer.next())
    

  }
}

