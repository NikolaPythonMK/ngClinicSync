import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'template-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: 'template-dialog.component.html',
    styleUrls: ['template-dialog.component.scss']
})
export class TemplateDialogComponent {

}