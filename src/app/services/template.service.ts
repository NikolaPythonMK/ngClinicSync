import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PAGE_NUMBER, PAGE_SIZE, URL } from "../constants/constants";
import { Page } from "../models/page";
import { AppointmentTemplate } from "../models/appointment-template";
import { Observable, of } from "rxjs";
import { AppointmentTemplateRequest } from "../models/appointment-template-request";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    constructor(private http : HttpClient){}

    getAll(page: number = PAGE_NUMBER, size: number = PAGE_SIZE, searchTerm?: string): Observable<Page<AppointmentTemplate>> {
        let params = new HttpParams().set('page', page).set('size', size);

        if (searchTerm){
            params = params.set('searchTerm', searchTerm);
        }

        return this.http.get<Page<AppointmentTemplate>>(`${URL}${'templates'}`, { params });
    }

    add(template: AppointmentTemplateRequest): Observable<AppointmentTemplate> {
        return this.http.post<AppointmentTemplate>(`${URL}${'templates'}`, template);
    }

    update(template: AppointmentTemplateRequest, templateId: number): Observable<AppointmentTemplate> {
        return this.http.put<AppointmentTemplate>(`${URL}${'templates'}/${templateId}`, template);
    }

    deleteSingle(id: number): Observable<AppointmentTemplate> {
        return this.http.delete<AppointmentTemplate>(`${URL}${'templates'}/${id}`);
    }

    deleteSelection(deleteAll: boolean = false, ids: number[]): Observable<number> {
        const params = {
            ids: ids.join(','),
            all: deleteAll,
        }
        return this.http.delete<number>(`${URL}${'templates'}`, { params });
    }
}