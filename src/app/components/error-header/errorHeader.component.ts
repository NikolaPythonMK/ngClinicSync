import { Component, Input } from "@angular/core";


@Component({
    selector: 'error-header',
    standalone: true,
    imports: [],
    templateUrl: 'errorHeader.component.html',
    styleUrls: ['errorHeader.component.scss']
})
export class ErrorHeaderComponent {
    @Input({required: true}) errorMessage: string = '';
}