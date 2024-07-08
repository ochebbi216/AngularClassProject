import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  form!: FormGroup;
  verifEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.verifEdit = true;
      this.initFormWithData(); // Initialize form with data if in edit mode
    } else {
      this.verifEdit = false;
      this.initForm(); // Initialize empty form if in create mode
    }
  }

  // Method to initialize form with empty values
  initForm(): void {
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null, [Validators.required]),
      date_debut: new FormControl(null, [Validators.required]),
      date_fin: new FormControl(null, [Validators.required]),
    });
  }

  // Method to initialize form with existing event data
  initFormWithData(): void {
    this.form = new FormGroup({
      titre: new FormControl(this.data?.titre, [Validators.required, Validators.minLength(3)]),
      lieu: new FormControl(this.data?.lieu, [Validators.required]),
      date_debut: new FormControl(this.data?.date_debut, [Validators.required]),
      date_fin: new FormControl(this.data?.date_fin, [Validators.required]),
    });
  }

  // Method to save the form data
  save() {
    if (!this.verifEdit) {
      this.eventService.save(this.form.value).subscribe(() => {
        this.dialogRef.close(this.form.value);
      });
    } else {
      this.eventService.edit(this.form.value, this.data?.id).subscribe(() => {
        this.dialogRef.close(this.form.value);
      });
    }
  }

  // Method to close the dialog
  close() {
    this.dialogRef.close();
  }
}
