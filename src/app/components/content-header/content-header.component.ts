import { Component, inject, Input } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TemplateDialogComponent } from "../template-dialog/template-dialog.component";



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

    openDialog() {
        const dialogRef = this.dialog.open(TemplateDialogComponent);
    }

}