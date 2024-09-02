import { AppointmentStatus } from "./appointment.status";
import CalendarPosition from "./calendar.position";
import { Client } from "./client";
import { Label } from "./label";

export interface Appointment {
    id: number,
    date: Date,
    duration: number,
    label: Label,
    description: string,
    client: Client,
    price: number,
    status: AppointmentStatus,
    createdAt: Date,
    doneAt?: Date,
    calendarPosition: CalendarPosition,
}