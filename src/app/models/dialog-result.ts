export enum HttpMethods {
    GET,
    POST,
    PUT,
    DELETE,
}

export interface DialogResult<T> {
    operation: HttpMethods,
    data: T
}