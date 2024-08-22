import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppointmentTemplate } from "../../models/appointment-template";
import { AppointmentTemplateRequest } from "../../models/appointment-template-request";

@Component({
    selector: 'template-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
    templateUrl: 'template-dialog.component.html',
    styleUrls: ['template-dialog.component.scss']
})
export class TemplateDialogComponent implements OnInit{

    name: string = '';
    description?: string;
    price?: number;
    duration?: number;

    isSubmitted: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentTemplate | null,
                public dialogRef: MatDialogRef<TemplateDialogComponent>){}

    ngOnInit(): void {
        if(this.data !== null){
            this.name = this.data.name;
            this.description = this.data.description;
            //this.duration = this.data.duration;
            this.price = this.data.price;
        }
    }

    onSubmit(): void {
        this.isSubmitted = true;
        if (this.name === ''){
            return;
        }

        const template: AppointmentTemplateRequest = {
            name: this.name,
            durationInMinutes: this.duration,
            description: this.description,
            price: this.price
        }
        this.dialogRef.close(template);
    }
}