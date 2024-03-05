import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService (2)';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
constructor( private auth : AuthService , private router : Router){}
nom!:any;
img!:any;
myuser!:any;
ngOnInit(): any {
    this.auth.getUserClaims().then(user=>{
      this.myuser= user
      console.log(user);
      this.nom = user.displayName;
      this.img = user.photoURL;

    }).catch(err =>{
      // alert(err);
    })
}
logout():void{
  this.auth.doLogout().then(()=>{
    this.router.navigate(['/login']);
  })
}
}
