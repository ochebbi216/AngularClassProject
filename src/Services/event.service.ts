import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Modeles/Event';
import { global } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {
    this.GET;
  }

  GET(): Observable<Evt[]> {
    //envoier une requette http en mode GET vers JSON SERVER
    return this.httpClient.get<Evt[]>('http://localhost:3000/evt');
  }
  ONDELETE(id: string): Observable<Evt> {
    return this.httpClient.delete<Evt>(`http://localhost:3000/evt/${id}`);
  }
  save(form: Evt): Observable<Evt> {
    return this.httpClient.post<Evt>('http://localhost:3000/evt', form);
  }
  edit(form: Evt, id: string): Observable<Evt> {
    return this.httpClient.put<Evt>(`http://localhost:3000/evt/${id}`, form);
  }
  getEvtById(id: String): Observable<Evt> {
    return this.httpClient.get<Evt>(`http://localhost:3000/evt/${id}`);
  }
}