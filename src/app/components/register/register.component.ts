import { Component, signal } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordStrengthValidator } from "../../validators/password-strength.validator";
import { matchPasswordValidator } from "../../validators/password-match.validator";
import { AuthService } from "../../services/auth.service";
import { ErrorHeaderComponent } from "../error-header/errorHeader.component";
import { RegisterRequest } from "../../models/register-request";


@Component({
    selector: 'register-app',
    standalone: true,
    imports: [RouterLink, ErrorHeaderComponent, 
              MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent {
    hidePassword = signal(true);
    registerForm: FormGroup;
    errorMessage?: string;

    constructor(private fb : FormBuilder, private authService: AuthService, private router: Router){
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordStrengthValidator]],
            confirmPassword: ['', [Validators.required, passwordStrengthValidator]]
        },
        { validators: matchPasswordValidator('password', 'confirmPassword') });
    }

    onSubmit(): void {
        const credentials: RegisterRequest = {
            username: this.registerForm.controls['email'].value,
            password: this.registerForm.controls['password'].value
        }

        this.authService.register(credentials).subscribe({
            next: () => {
                this.router.navigate(['/templates'])
            },
            error: (error: string) => {
                this.errorMessage = error;
            }
        })
    }

    showPassword(event: MouseEvent): void {
        this.hidePassword.set(!this.hidePassword());    
        event.stopPropagation();
    }
}