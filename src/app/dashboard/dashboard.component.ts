import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ArticleService } from 'src/Services/article.service';
import { EventService } from 'src/Services/event.service';
import { Member1Service } from 'src/Services/member1.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

Nb_Articles!: Number ;
Nb_Memebers!: Number;
Nb_Events!: Number;
Nb_Tools!: Number;

constructor( private AS : ArticleService, private MS: Member1Service, private ES: EventService ){}

ngOnInit(): void {
  this.AS.getAll( ).subscribe((data) =>{
    this.Nb_Articles = data.length;

  });
  this.MS.
}

}
