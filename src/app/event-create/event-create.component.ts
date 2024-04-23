import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ES: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.verifEdit = true;
      console.log(this.data);
      this.initForm2();
    } else {
      this.verifEdit = false;
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null, [Validators.required]),
      date_debut: new FormControl(null, [Validators.required]),
      date_fin: new FormControl(null, [Validators.required]),
    });
  }
  initForm2(): void {
    this.form = new FormGroup({
      titre: new FormControl(this.data?.titre, [Validators.required]),
      lieu: new FormControl(this.data?.lieu, [Validators.required]),
      date_debut: new FormControl(this.data?.date_debut, [Validators.required]),
      date_fin: new FormControl(this.data?.date_fin, [Validators.required]),
    });
  }

  save() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.ES.save(this.form.value).subscribe(() => {
        console.log(this.form.value);
      });
    } else {
      this.dialogRef.close(this.form.value);
      this.ES.edit(this.form.value, this.data?.id).subscribe(() => {
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
