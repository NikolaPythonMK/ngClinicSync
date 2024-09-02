import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Client } from "../../../models/client";
import { ClientRequest } from "../../../models/client-request";
import { DialogResult, HttpMethods } from "../../../models/dialog-result";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
    selector: 'clients-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
    templateUrl: 'clients-dialog.component.html',
    providers: [provideNativeDateAdapter()],
    styleUrls: ['clients-dialog.component.scss']
})
export class ClientDialog {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    address?: string;
    dateOfBirth?: Date;
    gender?: string;

    isSubmitted: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Client | null,
                public dialogRef: MatDialogRef<ClientDialog>){}

    ngOnInit(): void {
        if(this.data !== null){
            this.firstName = this.data.firstName;
            this.lastName = this.data.lastName;
            this.phone = this.data.phone;
            this.email = this.data.email;
            this.address = this.data.address;
            this.dateOfBirth = this.data.dateOfBirth;
            this.gender = this.data.gender;
        }
    }

    onSubmit(): void {
        this.isSubmitted = true;
        if (this.firstName === '' || this.firstName === undefined){
            return;
        }
        if (this.lastName === '' || this.lastName === undefined){
            return;
        }

        console.log('date: ', this.dateOfBirth?.toDateString())
        console.log('now: ', Date.now());

        const client: ClientRequest = {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            address: this.address,
            dateOfBirth: this.dateOfBirth?.toISOString().split('T')[0],
            gender: this.gender
        }

        const result: DialogResult<ClientRequest> = {
            operation: HttpMethods.POST,
            data: client
        }

        this.dialogRef.close(result);
    }

    onSingleDelete(id: number): void {
        const result: DialogResult<number> = {
            operation: HttpMethods.DELETE,
            data: id,
        }
        this.dialogRef.close(result);
    }
}