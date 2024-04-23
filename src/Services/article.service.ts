import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Modeles/Publication';
import { global } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  source:Article[]=[];

  constructor( private HttpClient: HttpClient) { }

  getAll():Observable<Article[]>{

    return this.HttpClient.get<Article[]>('http://localhost:3000/article');
  }

  onsave(articleToSave: any): Observable<void> {

    return this.HttpClient.post<void>('http://localhost:3000/article',articleToSave);
  }
  delete(id: String): Observable<void> {

    return this.HttpClient.delete<void>(`http://localhost:3000/article/${id}`);
  }
  update(id: String,articleToUpdate: any ): Observable<void> {

    return this.HttpClient.put<void>(`http://localhost:3000/article/${id}`, articleToUpdate);
  }
  getArticleById(id :String):Observable<Article>{
    return this.HttpClient.get<Article>(`http://localhost:3000/article/${id}`);
  }

}
  //   const article = {
  //     ...articleToSave, //... pour extracter les attributs
  //     id: Math.ceil(Math.random() * 1000).toString(), //ceil pour forsage de type
  //     date: new Date()
  //   }
  //   this.source.push(article);//ajout le membre dans le sourcele des membres
  //   return new Observable(observer => observer.next())
  // }

  // Ondelete(id: string): Observable<any> {
  //   this.source = this.source.filter(item => item.id != id);
  //   return new Observable(observer => observer.next())

  // }

  // getarticleById(id: string): Observable<any> {
  //   // return this.httpClient.get<any>("http://localhost:3000/api/articles/"+id);
  //   return new Observable(observer => observer.next(
  //     this.source.filter(item => item.id == id)[0] ?? null
  //   ))
  // }
  // // updatearticle(id: string, data: any): Observable<any> {
  // //   let index = this.source.findIndex((item) => item.id === id);
  // //   if (index != -1) {
  // //     this.source[index] = { ...this.source[index], ...data };
  // //     return new Observable(observer => observer.next(true));
  // //   } else { 
  // //     return new Observable(observer => observer.error('Error')) 
  // //   }

  // // }
  // updatearticle(id: string , data : any ): Observable <any>{
  //   const index =this.source.findIndex(item=>item.id==id)
  //   this.source[index]={id:id,...data,createdDate:new Date().toISOString()}
  //   return new Observable(observer=>observer.next())
    

  // }


