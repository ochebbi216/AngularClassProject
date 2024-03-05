import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  source:any[]=global._db.article;

  constructor() { }

}
