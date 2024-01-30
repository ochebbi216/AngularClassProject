import { Component } from '@angular/core';
import { global } from '../app-config';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],

})
export class MemberComponent {
// nom='2 glid 1';
displayedColumns:String[]=['1','2', '3', '4', '5', '6','7']
dataSource:any[]= global._db.members;
  // {id:'001', cin:'12345678', name:'imen',cv: 'lien', type:'teacher',createdDate:'12/12/2020'},
  // {id:'002', cin:'12345679', name:'ilyes',cv: 'lien', type:'student',createdDate:'01/12/2022'},
  // {id:'003', cin:'12345677', name:'emna',cv: 'lien', type:'Data scientest',createdDate:'12/10/2022'}

}
