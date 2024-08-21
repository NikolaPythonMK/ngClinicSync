import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PAGE_NUMBER, PAGE_SIZE, URL } from "../constants/constants";
import { Page } from "../models/page";
import { AppointmentTemplate } from "../models/appointment-template";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    constructor(private http : HttpClient){}

    getAll(page: number = PAGE_NUMBER, size: number = PAGE_SIZE): Observable<Page<AppointmentTemplate>> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<Page<AppointmentTemplate>>(`${URL}${'templates'}`, { params });
    }
}