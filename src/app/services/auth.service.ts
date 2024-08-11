import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { LoginResponse } from "../models/loginResponse";
import { URL } from "../constants/db";
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from "@angular/common/http";
 

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient){}

    public login(credentials: FormData): Observable<LoginResponse> {
        return this.http.post<string>(URL + 'login', credentials).pipe(
            tap((result) => console.log(result)),
            map(result => {
                this.setToken(result);
                return { status: true };
            }),
            catchError(error => {
                return of({ status: false, errorMessage: error });
            })
        );
    }

    public register(credentials: FormData): Observable<LoginResponse> {
        return this.http.post<string>(URL + 'registser', credentials).pipe(
            tap((result) => console.log(result)),
            map(result => {
                this.setToken(result);
                return { status: true };
            }),
            catchError(error => {
                return of({ status: false, errorMessage: error });
            })
        )
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

    private setToken(token: string): void {
        localStorage.setItem('token', token);
    }

}