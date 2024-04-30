import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from 'src/app/app-config';

@Injectable({//on peut l'injecter dans n'importe quel composant(mech n3ytlou b3ed fel fnct)
  providedIn: 'root'//nejm najoutih fi ay composant eli 3andi fel code
})
export class Member1Service {


  tab:any[]=global._db.members;
  constructor(private httpClient:HttpClient) {

   }
  ONSAVE(membertosave:any):Observable<any>{
    //generateur de requete HTTP => lance un thread de type observale (pattron qui contient 3 entites topic ,observer,subscriber)
    //thread => synchronisation entre frot et back (bech ay changement fel BD yettaficha fel front)
    // return this.httpClient.post
    // ('localhost:8000/api/Member',membertosave)//laison entre back et front
    const Member1={
      //membertosave contient 4 données w houma 6 (ne9sin id w createddate)
      ...membertosave,//extracter toutes les attributes de membertosave(...)
      id:Math.ceil(Math.random()*1000).toString(),//generation d'un identifiant unique pour cette personne
      createdDate:new Date().toISOString()//date de creation en ISO
    }
    this.tab.push(Member1);//push=> ajouter un elet dans un tab 
        return  new Observable(observer=> {observer.next()})//next()=> topic
        //observer.next() => si pas d'erreur  on appelle next()
}
GETALL():Observable<Event[]>{
  return this.httpClient.get<Event[]>('http://localhost:3000/members')
}
  onDelete(id:string):Observable<any>
  {
    // return this.httpClient.delete<any>('127.0.0.1:8000/api/Member/$id');si on a backend 
    this.tab =this.tab.filter((item) => item.id !=id );//filtrer
    return new Observable(observer=> observer.next())
  }
  getMemberbyId(id:string):Observable<any>{
    // return this.httpClient.get<any>('127.0.0.1:8080/api/Member/$id')
    return new Observable(observer=> observer.next(
    this.tab.filter(item=>item.id==id)[0]??null//ken 9itou irj3houli fel pos 0 /??:sinon/null
    ))
  }

  updateMember(id: string , updatedMember : any ): Observable <any>{
    const index =this.tab.findIndex(item=>item.id==id)
    this.tab[index]={id:id,...updatedMember,
    createdDate:new Date().toISOString()}
    return new Observable(observer=>observer.next())
    

  }


}