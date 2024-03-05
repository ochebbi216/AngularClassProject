import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import {Article} from "src/Modeles/Publication"
import { ArticleService } from 'src/Services/article.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'type', 'titre', 'date'];
  datasource = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private MS: ArticleService) {
    this.datasource.data = this.MS.source;
  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;  
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}