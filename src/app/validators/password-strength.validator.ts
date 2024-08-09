import { AbstractControl } from "@angular/forms";

export function passwordStrengthValidator(control: AbstractControl){
    const password: string = control.value;
    if(!password) return; // password is empty

    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    const valid = hasNumber && hasUpper && hasLower;

    return valid ? null : { invalidPassword: true };
}
