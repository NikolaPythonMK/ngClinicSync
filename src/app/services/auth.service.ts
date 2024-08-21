import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { DefaultResponse } from "../models/default-response";
import { URL } from "../constants/constants";
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from "@angular/common/http";
import { RegisterRequest } from "../models/register-request";
import { LoginRequest } from "../models/login-request";
 

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient){}

    public login(credentials: LoginRequest): Observable<DefaultResponse> {
        return this.authenticate('login', credentials);
    }

    public register(credentials: RegisterRequest): Observable<DefaultResponse> {
        return this.authenticate('register', credentials);
    }

    public logout(): void {
        localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const decodedToken = jwtDecode(token);

        if (decodedToken.exp){
            const currentTime = Date.now() / 1000;
            return decodedToken.exp > currentTime;
        }
        return false;
    }

    private authenticate(endpoint: string, credentials: LoginRequest | RegisterRequest): Observable<DefaultResponse> {
        return this.http.post<string>(`${URL}${endpoint}`, credentials).pipe(
            tap(response => this.setToken(response)),
            map(() => ({ status: true })),
            catchError(errorResponse => {
                return throwError(() => new Error(errorResponse.error));
            })
        )
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
    }
}