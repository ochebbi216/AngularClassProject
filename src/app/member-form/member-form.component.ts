import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member1Service } from 'src/Services/member1.service';

@Component({
  selector: 'app-member-form', 
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //injection  de dépendances (services)
  // creer une  instance du service dans le constructeur et l'assigner à un attribut
  constructor(private MS : Member1Service, private router: Router, private activatedRoute:ActivatedRoute){}
form!:FormGroup;
idcourant!:any;
ngOnInit():void{
  //recupere la route actuelle pour savoir si on est en mode ajout ou modification d'un membre
  this.idcourant = this.activatedRoute.snapshot.params['id'];

  console.log(this.idcourant);
  if(!!this.idcourant){ //definit et non null
    this.MS.getMemberbyId(this.idcourant).subscribe((data)=>{
      this.editForm(data);
    });
  
  //if(id) existe et a une valeur =>
  // getMemberbyId(id)=> editForm(memberFind)
  //else => je suis dans create 
  }
  else this.addForm();
}
editForm(data:any):void{
  this.form = new FormGroup({
    cin: new FormControl(data.cin,[Validators.required]),
    name: new FormControl(data.name,[Validators.required]),
    cv: new FormControl(data.cv,[Validators.required]),
    type: new FormControl(data.type,[Validators.required]),
    
    })

}
addForm():void{
  this.form = new FormGroup({
    cin: new FormControl(null,[Validators.required,Validators.maxLength(8)]),
    name: new FormControl(null,[Validators.required]),
    cv: new FormControl(null,[Validators.required]),
    type: new FormControl(null,[Validators.required]),
    })

}
onsub():void{
 const member = this.form.value;
if(!!this.idcourant){
  // update
  //appeler le fonction onsave : generateur de requete 
  //subscribe(()=>{}): ()le var return from back et {} pour res et error
  this.MS.updateMember(this.idcourant, member).subscribe(()=>{
    this.router.navigate(['/members'])
  })
}
else{
  //appeler le fonction onsave : generateur de requete 
  //subscribe(()=>{}): ()le var return from back et {} pour res et error
  this.MS.ONSAVE(member).subscribe(()=>{
    this.router.navigate(['/members'])
  })
}

}
}
