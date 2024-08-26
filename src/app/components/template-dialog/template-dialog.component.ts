import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppointmentTemplate } from "../../models/appointment-template";
import { AppointmentTemplateRequest } from "../../models/appointment-template-request";
import { MatIconModule } from "@angular/material/icon";
import { TemplateService } from "../../services/template.service";
import { NotificationService } from "../../services/notification.service";
import { Dialog } from "@angular/cdk/dialog";
import { DialogResult } from "../../models/dialog-result";
import { HttpMethods } from "../../models/dialog-result";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'template-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, CommonModule],
    templateUrl: 'template-dialog.component.html',
    styleUrls: ['template-dialog.component.scss']
})
export class TemplateDialogComponent implements OnInit{

    name: string = '';
    description?: string;
    price?: number;
    hours?: number;
    minutes?: number;

    isSubmitted: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: AppointmentTemplate | null,
                public dialogRef: MatDialogRef<TemplateDialogComponent>,
                private templateService: TemplateService,
                private notificationService: NotificationService){}

    ngOnInit(): void {
        if(this.data !== null){
            const duration = this.getDurationFromTimeSpan(this.data.duration);

            this.name = this.data.name;
            this.description = this.data.description;
            this.hours = duration[0];
            this.minutes = duration[1];
            this.price = this.data.price;
        }
    }

    onSubmit(): void {
        this.isSubmitted = true;
        if (this.name === ''){
            return;
        }
        if (this.hours && this.hours < 0){
            return;
        }
        if (this.minutes && this.minutes < 0){
            return;
        }

        const template: AppointmentTemplateRequest = {
            name: this.name,
            durationInMinutes: this.getDuration(),
            description: this.description,
            price: this.price
        }

        const result: DialogResult<AppointmentTemplateRequest> = {
            operation: HttpMethods.POST,
            data: template
        }

        this.dialogRef.close(result);
    }

    onSingleDelete(id: number): void {
        const result: DialogResult<number> = {
            operation: HttpMethods.DELETE,
            data: id,
        }
        this.dialogRef.close(result);
    }

    onSelectionDelete(ids: number[]): void {

    }

    private getDuration(): number | undefined {
        if (this.hours == null && this.minutes == null) {
            return;
        } 

        const hours: number = this.hours ? this.hours : 0;
        const minutes: number = this.minutes ? this.minutes : 0;

        return (hours * 60) + minutes;
    }

    private getDurationFromTimeSpan(duration: string): number[] {
        const parts = duration.split(':');
        const hours = Number.parseInt(parts[0]);
        const minutes = Number.parseInt(parts[1]);
        return [hours, minutes];
    }
}