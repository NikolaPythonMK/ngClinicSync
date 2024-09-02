import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PAGE_NUMBER, PAGE_SIZE, URL } from "../constants/constants";
import { Page } from "../models/page";
import { Client } from "../models/client";
import { ClientRequest } from "../models/client-request";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http : HttpClient){}

    getAll(page: number = PAGE_NUMBER, size: number = PAGE_SIZE, searchTerm?: string): Observable<Page<Client>> {
        let params = new HttpParams().set('page', page).set('size', size);

        if (searchTerm){
            params = params.set('searchTerm', searchTerm);
        }

        console.log('ENTERING');

        return this.http.get<Page<Client>>(`${URL}${'clients'}`, { params });
    }

    add(clientData: ClientRequest): Observable<Client> {
        return this.http.post<Client>(`${URL}${'clients'}`, clientData);
    }

    update(clientData: ClientRequest, clientId: number): Observable<Client> {
        return this.http.put<Client>(`${URL}${'clients'}/${clientId}`, clientData);
    }

    deleteSingle(id: number): Observable<Client> {
        return this.http.delete<Client>(`${URL}${'clients'}/${id}`);
    }

    deleteSelection(deleteAll: boolean = false, ids: number[]): Observable<number> {
        const params = {
            ids: ids.join(','),
            all: deleteAll,
        }
        return this.http.delete<number>(`${URL}${'clients'}`, { params });
    }
}