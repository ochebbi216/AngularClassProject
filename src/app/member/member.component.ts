import { Component } from '@angular/core';
import { global } from '../app-config';
import { Member1Service } from 'src/Services/member1.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],

})
export class MemberComponent {
  constructor(private MS : Member1Service, private router: Router, private dialog : MatDialog){}

// nom='2 glid 1';
displayedColumns:String[]=['1','2', '3', '4', '5', '6','7']
dataSource:any[]= global._db.members;
  // {id:'001', cin:'12345678', name:'imen',cv: 'lien', type:'teacher',createdDate:'12/12/2020'},
  // {id:'002', cin:'12345679', name:'ilyes',cv: 'lien', type:'student',createdDate:'01/12/2022'},
  // {id:'003', cin:'12345677', name:'emna',cv: 'lien', type:'Data scientest',createdDate:'12/10/2022'}
  confirmDelete(id:string):void{
    //1 lancer la boite 
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    //2 attendre le resultat de user 
    dialogRef.afterClosed().subscribe(x => {
    //3 si user a fait le click sur confirm
      if(x){
        this.MS.Ondelete(id).subscribe(()=>{
          this.dataSource=this.MS.tab
        })
      }
    });
    
  }
}
