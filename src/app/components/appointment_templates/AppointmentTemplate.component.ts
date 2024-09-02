import { Component, inject, OnInit } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from "@angular/cdk/collections";
import { ContentHeader } from "../content-header/content-header.component";
import { TemplateService } from "../../services/template.service";
import { AppointmentTemplate } from "../../models/appointment-template";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { TemplateDialogComponent } from "../template-dialog/template-dialog.component";
import { AppointmentTemplateRequest } from "../../models/appointment-template-request";
import { NotificationService } from "../../services/notification.service";
import { DialogResult, HttpMethods } from "../../models/dialog-result";
import { MatIconModule } from "@angular/material/icon";
import { ConfirmationDialog } from "../confirmation-dialog/confirmation-dialog.component";
import { AlertType } from "../../models/confirmation-dialog-data";
import { ShortenPipe } from "../../pipes/shorten.pipe";


@Component({
    selector: 'appointment-template-app',
    standalone: true,
    imports: [MatTableModule, MatCheckboxModule, ContentHeader, MatPaginatorModule, MatIconModule, ShortenPipe],
    templateUrl: 'appointmentTemplate.component.html',
    styleUrls: ['appointmentTemplate.component.scss']
})
export class AppointmentTemplateComponent implements OnInit {
    displayedColumns: string[] = ['select', 'id', 'name', 'description', 'duration', 'price']
    dataSource = new MatTableDataSource<AppointmentTemplate>();
    selection = new SelectionModel<AppointmentTemplate>(true, []);

    totalElements: number = 0;
    errorMessage?: string;
    readonly dialog = inject(MatDialog);

    pageNumber: number = 1;
    pageSize: number = 15;
    searchTerm: string = '';


    constructor(private appointmentTemplateService : TemplateService,
                private router : Router,
                private route : ActivatedRoute,
                private notificationService : NotificationService,
    ) {}

    ngOnInit(): void {
        this.appointmentTemplateService.getAll().subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<AppointmentTemplate>(result.content);
                this.totalElements = result.totalElements;
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
        })
    }

    toggleAllRows(): void {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    checkboxLabel(row: any = ''): string {
        return '';
    }

    handleRowClick(template: AppointmentTemplate){
        const dialogRef = this.dialog.open(TemplateDialogComponent, {
            width: '600px',
            height: '750px',
            data: {...template}
        })
        dialogRef.afterClosed().subscribe((result: DialogResult<AppointmentTemplateRequest | number>) => {
            if(result.operation === HttpMethods.POST){
                const data = result.data as AppointmentTemplateRequest;
                this.appointmentTemplateService.update(data, template.id).subscribe({
                    next: (result) => {
                        this.notificationService.success('The appointment template has been updated successfully');
                        template.name = result.name;
                        template.duration = result.duration;
                        template.description = result.description;
                        template.price = result.price;
                        template.motifiedAt = result.motifiedAt;
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                })
            }
            else if(result.operation === HttpMethods.DELETE) {
                const data = result.data as number;
                this.appointmentTemplateService.deleteSingle(data).subscribe({
                    next: (result) => {
                        this.getAppointmentTemplates();
                        this.notificationService.success(`The template ${result.name} has been deleted successfully.`)
                    },
                    error: (error) => {
                        this.notificationService.error(error.message)
                    }
                })
            }
        })
    }

    handlePageChange(event: PageEvent){
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;

        const page = {
            page: this.pageNumber,
            size: this.pageSize
        }
        
        this.router.navigate([], {  
            relativeTo: this.route,
            queryParams: page,
            queryParamsHandling: 'merge'
        })

        this.getAppointmentTemplates();
    }

    handleOnSelectionDelete(): void {
        const dialogData = {
            title: 'Delete selected appointment templates',
            text: 'This action is <b>irreversible</b>.',
            alert: AlertType.DANGER
        }

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: dialogData,
        });

        dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
            if (isConfirmed){
                const ids: number[] = this.selection.selected.map(i => i.id);
                this.appointmentTemplateService.deleteSelection(this.isAllSelected(), ids).subscribe({
                    next: () => {
                        this.getAppointmentTemplates();
                        this.notificationService.success('The appointment templates have been deleted successfully.')
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                });
            }
        })
    }

    handleAddTemplate(): void {
        this.getAppointmentTemplates();
    }

    handleSearch(term: string):void {
        this.searchTerm = term;
        this.getAppointmentTemplates();
    }

    private getAppointmentTemplates(): void {
        this.appointmentTemplateService.getAll(this.pageNumber, this.pageSize, this.searchTerm).subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<AppointmentTemplate>(result.content);
                this.totalElements = result.totalElements;
            },
            error: (error) => {
                this.errorMessage = error;
            }
        })
    }
}