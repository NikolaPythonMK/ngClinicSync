import { Observable } from "rxjs";

export abstract class BaseService<T> {
    
    abstract deleteSingle(id: number): Observable<T>;
    abstract deleteSelection(): Observable<void>

}