import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {

  //injection  de dépendances (services)
  // creer une  instance du service dans le constructeur et l'assigner à un attribut
  constructor(private MS: ArticleService, private router: Router, private activatedRoute: ActivatedRoute) { }
  form!: FormGroup;
  idcourant!: any;
  ngOnInit(): void {
    //recupere la route actuelle pour savoir si on est en mode ajout ou modification d'un membre
    this.idcourant = this.activatedRoute.snapshot.params['id'];

    console.log(this.idcourant);
    if (!!this.idcourant) { //definit et non null
      this.MS.getarticleById(this.idcourant).subscribe((data) => {
        this.editForm(data);
      });

      //if(id) existe et a une valeur =>
      // getMemberbyId(id)=> editForm(memberFind)
      //else => je suis dans create 
    }
    else this.addForm();
  }
  editForm(data: any): void {
    this.form = new FormGroup({
      type: new FormControl(data.type, [Validators.required]),
      title: new FormControl(data.title, [Validators.required]),
      lien: new FormControl(data.lien, [Validators.required]),
      sourcepdf: new FormControl(data.sourcepdf, [Validators.required]),

    })

  }
  addForm(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      lien: new FormControl(null, [Validators.required]),
      sourcepdf: new FormControl(null, [Validators.required]),
    })

  }
  onsub(): void {
    const member = this.form.value;
    if (!!this.idcourant) {
      // update
      //appeler le fonction onsave : generateur de requete 
      //subscribe(()=>{}): ()le var return from back et {} pour res et error
      this.MS.updatearticle(this.idcourant, member).subscribe(() => {
        this.router.navigate(['/articles'])
      })
    }
    else {
      //appeler le fonction onsave : generateur de requete 
      //subscribe(()=>{}): ()le var return from back et {} pour res et error
      this.MS.OnSave(member).subscribe(() => {
        this.router.navigate(['/articles'])
      })
    }

  }
}
