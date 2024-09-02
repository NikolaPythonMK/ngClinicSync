import { Component, DestroyRef, inject, Input, OnInit, output, Output } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TemplateDialogComponent } from "../template-dialog/template-dialog.component";
import { AppointmentTemplateRequest } from "../../models/appointment-template-request";
import { TemplateService } from "../../services/template.service";
import { NotificationService } from "../../services/notification.service";
import { DialogResult } from "../../models/dialog-result";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { distinctUntilChanged, filter } from "rxjs";
import { debounceTime } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";




@Component({
    selector: 'content-header',
    standalone: true,
    imports: [MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: 'content-header.component.html',
    styleUrls: ['content-header.component.scss']
})
export class ContentHeader implements OnInit {
    @Input({required: true}) title: string = '';
    @Input() totalCount: number | null = null;
    onAddTemplate = output<void>();
    searchTermChange = output<string>();
    readonly dialog = inject(MatDialog);
    readonly destroyRef = inject(DestroyRef);

    searchTerm = new FormControl('');

    constructor(private templateService: TemplateService,
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
        const dialogRef = this.dialog.open(TemplateDialogComponent, {
            width: '600px',
            height: '750px'
        });

        //TODO: The appointment template should do this ???
        dialogRef.afterClosed().subscribe((result: DialogResult<AppointmentTemplateRequest>) => {
            if (result) {
                this.templateService.add(result.data).subscribe({
                    next: () => {
                        this.notificationService.success('The appointment template has been added successfully.')
                        this.onAddTemplate.emit();
                    },
                    error: (error) => {
                        this.notificationService.error(error.message);
                    }
                })
            }
        })
    }
}

