import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Modeles/Event';
import { global } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  tab: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.GET;
  }

  GET(): Observable<any[]> {
    //envoier une requette http en mode GET vers JSON SERVER
    return this.httpClient.get<Evt[]>('http://localhost:3000/evt');
  }
  ONDELETE(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/evt/${id}`);
  }
  save(form: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/evt', form);
  }
  edit(form: any, id: string): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:3000/evt/${id}`, form);
  }
  getEvtById(id: String): Observable<Evt> {
    return this.httpClient.get<Evt>(`http://localhost:3000/evt/${id}`);
  }
}