import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  
  form!: FormGroup;
  id!: string; // Assuming the ID is a string
  
  constructor(
    private dialogRef: MatDialogRef<ArticleFormComponent>,
    private AS: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data to handle article ID
  ) { }
  
  ngOnInit(): void {
    this.id = this.data ? this.data.id : null; 
    

    if (this.id) {
      // Fetch article data if editing
      this.AS.getArticleById(this.id).subscribe((data) => {
        this.editForm(data);
      });
    } else {
      // Create a new form if adding
      this.addForm();
    }
  }

  save() {
    const articleData = this.form.value;
    
    if (this.id) {
      // If editing, update the existing article
      this.AS.update(this.id, articleData).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    } else {
      // If adding, create a new article
      this.AS.onsave(articleData).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  addForm(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      lien: new FormControl(null, [Validators.required]),
      sourcepdf: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
  }

  editForm(data: any): void {
    this.form = new FormGroup({
      type: new FormControl(data.type, [Validators.required]),
      title: new FormControl(data.title, [Validators.required]),
      lien: new FormControl(data.lien, [Validators.required]),
      sourcepdf: new FormControl(data.sourcepdf, [Validators.required]),
      date: new FormControl(data.date, [Validators.required]),
    });
  }
}
