import { Component, OnInit } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from "@angular/cdk/collections";
import { ContentHeader } from "../content-header/content-header.component";
import { TemplateService } from "../../services/template.service";
import { AppointmentTemplate } from "../../models/appointment-template";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'appointment-template-app',
    standalone: true,
    imports: [MatTableModule, MatCheckboxModule, ContentHeader, MatPaginatorModule],
    templateUrl: 'appointmentTemplate.component.html',
    styleUrls: ['appointmentTemplate.component.scss']
})
export class AppointmentTemplateComponent implements OnInit {
    displayedColumns: string[] = ['select', 'id', 'name', 'description', 'duration', 'price']
    dataSource = new MatTableDataSource<AppointmentTemplate>();
    selection = new SelectionModel<AppointmentTemplate>(true, []);
    totalElements: number = 0;
    errorMessage?: string;

    constructor(private appointmentTemplateService : TemplateService,
                private router : Router,
                private route : ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.appointmentTemplateService.getAll().subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<AppointmentTemplate>(result.content);
                this.totalElements = result.totalElements;
            },
            error: (error) => {
                this.errorMessage = error;
                console.log('error: ', error);
            },
        })
    }

    toggleAllRows(): void {

    }

    isAllSelected(): boolean {
        return false;
    }

    checkboxLabel(row: any = ''): string {
        return '';
    }

    handlePageChange(event: PageEvent){
        const page = event.pageIndex + 1;
        const size = event.pageSize;
        
        this.router.navigate([], {  
            relativeTo: this.route,
            queryParams: {page, size},
            queryParamsHandling: 'merge'
        })

        this.appointmentTemplateService.getAll(page, size).subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<AppointmentTemplate>(result.content);
            },
            error: (error) => {
                this.errorMessage = error;
            }
        })
    }
}