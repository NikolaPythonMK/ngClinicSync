import { Component, DestroyRef, inject, Input, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NotificationService } from "../../../services/notification.service";
import { ClientService } from "../../../services/client.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { AppointmentTemplateRequest } from "../../../models/appointment-template-request";
import { DialogResult } from "../../../models/dialog-result";
import { TemplateDialogComponent } from "../../template-dialog/template-dialog.component";
import { ClientDialog } from "../clients-dialog/clients-dialog.component";
import { ClientRequest } from "../../../models/client-request";

@Component({
    selector: 'clients-header',
    standalone: true,
    imports: [MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: 'clients-header.component.html',
    styleUrls: ['clients-header.component.scss']
})
export class ClientsHeader {
    @Input({required: true}) title: string = '';
    @Input() totalCount: number | null = null;
    onAddClient = output<void>();
    searchTermChange = output<string>();
    readonly dialog = inject(MatDialog);
    readonly destroyRef = inject(DestroyRef);

    searchTerm = new FormControl('');

    constructor(private clientService: ClientService,
                private notificationService: NotificationService
    ){}

    ngOnInit(): void {
        this.searchTerm.valueChanges.pipe(
            // filter(value => value != null),
             debounceTime(300),
             distinctUntilChanged(),
             takeUntilDestroyed(this.destroyRef)
         ).subscribe(value => this.searchTermChange.emit(value!));
     }
 
     openDialog() {
         const dialogRef = this.dialog.open(ClientDialog, {
             width: '600px',
             height: '750px'
         });
 
         //TODO: The appointment template should do this ???
         dialogRef.afterClosed().subscribe((result: DialogResult<ClientRequest>) => {
             if (result) {
                 this.clientService.add(result.data).subscribe({
                     next: () => {
                         this.notificationService.success('The appointment template has been added successfully.')
                         this.onAddClient.emit();
                     },
                     error: (error) => {
                         this.notificationService.error(error.message);
                     }
                 })
             }
         })
     }

}