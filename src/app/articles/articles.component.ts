import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import {Article} from "src/Modeles/Publication"
import { ArticleService } from 'src/Services/article.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterViewInit {

  datasource= new MatTableDataSource<Article>();
  tabArticle: Article[]=[];
  constructor(private AS: ArticleService, private dialog: MatDialog,) {
  }

  displayedColumns: string[] = ['id', 'type', 'titre', 'date', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAllArticles(){
    this.AS.getAll().subscribe((data)=>{
      this.tabArticle= data;
      this.datasource = new  MatTableDataSource<Article>(this.tabArticle);
    
    }); }

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
          this.AS.delete(id).subscribe(()=>{
            this.getAllArticles();
          })
        }
      });
      
    }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;  
    this.getAllArticles();
  }
  open() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ArticleFormComponent, dialogConfig);
}
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}