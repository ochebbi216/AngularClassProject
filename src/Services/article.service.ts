import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  source:any[]=global._db.article;

  constructor() { }
  OnSave(articleToSave: any): Observable<any> {
    //generateur de requete http
    //thread observable
    // return this.httpClient.post('localhost:8000/api/article',articleToSave);
    const article = {
      ...articleToSave, //... pour extracter les attributs
      id: Math.ceil(Math.random() * 1000).toString(), //ceil pour forsage de type
      date: new Date()
    }
    this.source.push(article);//ajout le membre dans le sourcele des membres
    return new Observable(observer => observer.next())
  }

  Ondelete(id: string): Observable<any> {
    this.source = this.source.filter(item => item.id != id);
    return new Observable(observer => observer.next())

  }

  getarticleById(id: string): Observable<any> {
    // return this.httpClient.get<any>("http://localhost:3000/api/articles/"+id);
    return new Observable(observer => observer.next(
      this.source.filter(item => item.id == id)[0] ?? null
    ))
  }
  // updatearticle(id: string, data: any): Observable<any> {
  //   let index = this.source.findIndex((item) => item.id === id);
  //   if (index != -1) {
  //     this.source[index] = { ...this.source[index], ...data };
  //     return new Observable(observer => observer.next(true));
  //   } else { 
  //     return new Observable(observer => observer.error('Error')) 
  //   }

  // }
  updatearticle(id: string , data : any ): Observable <any>{
    const index =this.source.findIndex(item=>item.id==id)
    this.source[index]={id:id,...data,createdDate:new Date().toISOString()}
    return new Observable(observer=>observer.next())
    

  }
}

