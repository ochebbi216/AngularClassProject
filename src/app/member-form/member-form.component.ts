import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member1Service } from 'src/Services/member1.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //injection  de dépendances (services)
  // creer une  instance du service dans le constructeur et l'assigner à un attribut
  constructor(private MS : Member1Service, private router: Router){}
form!:FormGroup;
ngOnInit():void{
this.initForm();
}
initForm():void{
  this.form = new FormGroup({
    cin: new FormControl(null,[Validators.required,Validators.maxLength(8)]),
    name: new FormControl(null,[Validators.required]),
    cv: new FormControl(null,[Validators.required]),
    type: new FormControl(null,[Validators.required]),
    })

}
onsub():void{
  const member= this.form.value
  console.log(member);
  //appeler le fonction onsave : generateur de requete 
  //subscribe(()=>{}): ()le var return from back et {} pour res et  error
  this.MS.OnSave(member).subscribe(()=>{
    this.router.navigate(['/members'])
  })
}
}
