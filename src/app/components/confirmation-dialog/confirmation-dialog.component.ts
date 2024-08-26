import { Component, inject, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AlertType, ConfirmationDialogData } from "../../models/confirmation-dialog-data";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'confirmation-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
    templateUrl: 'confirmation-dialog.component.html',
    styleUrls: ['confirmation-dialog.component.scss']
})
export class ConfirmationDialog {
    readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);
    readonly data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

    handleConfirmation(): void {
        this.dialogRef.close(true);
    }             
}