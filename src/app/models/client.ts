export interface Client {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    dateOfBirth?: Date,
    gender?: string
}