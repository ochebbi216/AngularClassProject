import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
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
  tabEvt: Evt[] = []; // Array to store events
  displayedColumns: string[] = [
    'id',
    'titre',
    'lieu',
    'date_debut',
    'date_fin',
    'action',
  ]; // Columns to display in the table
  datasource = new MatTableDataSource<Evt>([]); // DataSource for the table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evtService: EventService,
    private dialog: MatDialog
  ) {}

  // Method to open the event creation dialog
  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(EventCreateComponent, dialogConfig);
  }

  // Method to delete an event
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

  // Method to edit an event
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
    this.getAllEvents(); // Fetch all events on component initialization
  }

  // Method to fetch all events
  getAllEvents() {
    this.evtService.GET().subscribe((result) => {
      this.tabEvt = result;
      this.datasource = new MatTableDataSource<Evt>(this.tabEvt);
    });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  // Method to apply a filter to the table
  applyFilter(event: any) {
    const filterValue = event?.target?.value;
    this.datasource.filter = filterValue
      ? filterValue.trim().toLowerCase()
      : '';
  }
}
