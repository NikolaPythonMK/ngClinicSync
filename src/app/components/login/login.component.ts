import { Component, signal } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ErrorHeaderComponent } from "../error-header/errorHeader.component";
import { LoginRequest } from "../../models/login-request";

@Component({
    selector: 'login-app',
    standalone: true,
    imports: [RouterLink,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, ErrorHeaderComponent],
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss',]
})
export class LoginComponent {
    hide = signal(true);
    loginForm: FormGroup;
    errorMessage?: string;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmit(): void {
      const credentials: LoginRequest = {
        username: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/templates']);
        },
        error: (error: string) => {
          this.errorMessage = error;
        }
      })
    }
    
    showPassword(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
}