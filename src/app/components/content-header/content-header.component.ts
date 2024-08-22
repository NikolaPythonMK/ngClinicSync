import { Component, inject, Input } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TemplateDialogComponent } from "../template-dialog/template-dialog.component";
import { AppointmentTemplateRequest } from "../../models/appointment-template-request";
import { TemplateService } from "../../services/template.service";
import { NotificationService } from "../../services/notification.service";



@Component({
    selector: 'content-header',
    standalone: true,
    imports: [MatInputModule, MatIconModule, MatButtonModule],
    templateUrl: 'content-header.component.html',
    styleUrls: ['content-header.component.scss']
})
export class ContentHeader {
    @Input({required: true}) title: string = '';
    @Input() totalCount: number | null = null;
    readonly dialog = inject(MatDialog);

    constructor(private templateService: TemplateService,
                private notificationService: NotificationService
    ){}

    openDialog() {
        const dialogRef = this.dialog.open(TemplateDialogComponent, {
            width: '600px',
            height: '750px'
        });

        dialogRef.afterClosed().subscribe((result: AppointmentTemplateRequest) => {
            if (result) {
                this.templateService.add(result).subscribe({
                    next: (result) => {
                        this.notificationService.success('The appointment template has been added successfully.')
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                })
            }
        })
    }
}