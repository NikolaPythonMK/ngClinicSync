import { Component, inject, OnInit } from "@angular/core";
import { Client } from "../../models/client";
import { BaseService } from "../../services/base.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ShortenPipe } from "../../pipes/shorten.pipe";
import { ContentHeader } from "../content-header/content-header.component";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { ClientService } from "../../services/client.service";
import { AlertType } from "../../models/confirmation-dialog-data";
import { ConfirmationDialog } from "../confirmation-dialog/confirmation-dialog.component";
import { ClientDialog } from "./clients-dialog/clients-dialog.component";
import { ClientRequest } from "../../models/client-request";
import { DialogResult, HttpMethods } from "../../models/dialog-result";
import { ClientsHeader } from "./clients-header/clients-header.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
    selector: 'clients',
    standalone: true,
    imports: [MatTableModule, MatCheckboxModule, ContentHeader, MatPaginatorModule, MatIconModule, ShortenPipe, ClientsHeader],
    providers: [provideNativeDateAdapter()],
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.scss'],
    // providers: [
    //     {
    //         provide: BaseService,
    //         useClass: CLientService
    //     }
    // ]
})
export class ClientComponent implements OnInit{
    displayedColumns = ['select', 'id', 'firstName', 'lastName', 'phone', 'email', 'dateOfBirth' ];
    dataSource = new MatTableDataSource<Client>();
    selection = new SelectionModel<Client>(true, []);

    totalElements: number = 0;
    errorMessage?: string;
    readonly dialog = inject(MatDialog);

    pageNumber: number = 1;
    pageSize: number = 15;
    searchTerm: string = '';

    constructor(private clientService: ClientService,
        private router : Router,
        private route : ActivatedRoute,
        private notificationService : NotificationService,
    ) {}

    ngOnInit(): void {
        this.clientService.getAll().subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<Client>(result.content);
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

    handleRowClick(client: Client){
        const dialogRef = this.dialog.open(ClientDialog, {
            width: '600px',
            height: '750px',
            data: {...client}
        })
        dialogRef.afterClosed().subscribe((result: DialogResult<ClientRequest | number>) => {
            if(result.operation === HttpMethods.POST){
                const data = result.data as ClientRequest;
                this.clientService.update(data, client.id).subscribe({
                    next: (result) => {
                        this.notificationService.success('The client has been updated successfully');
                        client.firstName = result.firstName;
                        client.lastName = result.lastName;
                        client.phone = result.phone;
                        client.email = result.email;
                        client.address = result.address;
                        client.dateOfBirth = result.dateOfBirth;
                        client.gender = result.gender;
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                })
            }
            else if(result.operation === HttpMethods.DELETE) {
                const data = result.data as number;
                this.clientService.deleteSingle(data).subscribe({
                    next: (result) => {
                        this.getClients();
                        this.notificationService.success(`The client ${result.firstName} ${result.lastName} has been deleted successfully.`)
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

        this.getClients();
    }

    handleOnSelectionDelete(): void {
        const dialogData = {
            title: 'Delete selected clients?',
            text: 'This action is <b>irreversible</b>.',
            alert: AlertType.DANGER
        }

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: dialogData,
        });

        dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
            if (isConfirmed){
                const ids: number[] = this.selection.selected.map(i => i.id);
                this.clientService.deleteSelection(this.isAllSelected(), ids).subscribe({
                    next: () => {
                        this.getClients();
                        this.notificationService.success('The clients have been deleted successfully.')
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                });
            }
        })
    }

    handleAddClient(): void {
        this.getClients();
    }

    handleSearch(term: string):void {
        this.searchTerm = term;
        this.getClients();
    }

    private getClients(): void {
        this.clientService.getAll(this.pageNumber, this.pageSize, this.searchTerm).subscribe({
            next: (result) => {
                this.dataSource = new MatTableDataSource<Client>(result.content);
                this.totalElements = result.totalElements;
            },
            error: (error) => {
                this.errorMessage = error;
            }
        })
    }

}