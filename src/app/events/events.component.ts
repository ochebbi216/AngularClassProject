import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Evt } from 'src/Modeles/Event';
import { EventService } from 'src/Services/event.service';
import { EventCreateComponent } from '../event-create/event-create.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, AfterViewInit {
  tabEvt: Evt[] = [];
  displayedColumns: string[] = [
    'id',
    'titre',
    'lieu',
    'date_debut',
    'date_fin',
    'action',
  ];
  nom = 'list';
  datasource = new MatTableDataSource<Evt>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evtService: EventService,
    private dialog: MatDialog
  ) {}

  
  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(EventCreateComponent, dialogConfig);
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.evtService.ONDELETE(id).subscribe(() => {
          this.getAllEvents();
        });
      }
    });
  }

  onedit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.evtService.getEvtById(id).subscribe((result) => {
      dialogConfig.data = result;
      this.dialog.open(EventCreateComponent, dialogConfig);
    });
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.evtService.GET().subscribe((result) => {
      console.log(result);
      this.tabEvt = result;
      this.datasource = new MatTableDataSource<Evt>(this.tabEvt);
    });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  applyFilter(event: any) {
    const filterValue = event?.target?.value;
    this.datasource.filter = filterValue
      ? filterValue.trim().toLowerCase()
      : '';
  }
}
