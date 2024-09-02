import { Component, OnInit } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { Appointment } from "../../models/appointment";
import { CalendarBlock } from "../../models/calendar.block";
import { AppointmentStatus } from "../../models/appointment.status";
import { MAX_COLUMNS, MAX_ROWS, COLORS } from "../../constants/calendar";

@Component({
    selector: 'calendar-app',
    standalone: true,
    imports: [MatIcon],
    templateUrl: 'calendar.component.html',
    styleUrl: 'calendar.component.scss'    
})
export class CalendarComponent implements OnInit{
    calendarBlocks = new Map<number, CalendarBlock[]>();
    appointments: Appointment[] = [];

    ngOnInit(): void {
      this.appointments = this.getAppointments();
      this.calendarBlocks = this.getCalendarBlocks();
    }

    private getCalendarBlocks(): Map<number, CalendarBlock[]> {
        const calendarBlocks = new Map<number, CalendarBlock[]>();
        const appointments = this.getAppointments();
        let blocks: CalendarBlock[] = [];
        let block: CalendarBlock;
        let colors  = this.getBlockColors();

        for (let i = 0; i < MAX_COLUMNS; i++){
            for (let j = 0; j < MAX_ROWS * 2; j++){
                if (appointments.find(a => a.calendarPosition.column === i && a.calendarPosition.row === j)) {
                    block = {
                        column: i,
                        row: j,
                        isOccupied: true,
                        appointment: appointments.find(a => a.calendarPosition.column === i && a.calendarPosition.row === j)!,
                        isExtend: false,
                        isWhole: true,
                        color: colors[colors.length - 1]
                    }
                    blocks.push(block);
                    for (let k = 0; k < block.appointment!.calendarPosition.rowSpan; k++) {
                        blocks.push({
                            column: i,
                            row: ++j,
                            isOccupied: true,
                            isExtend: true,
                            isWhole: true,
                            color: colors[colors.length - 1]
                        })
                    }
                    colors.pop();
                }
                else {
                    blocks.push({
                        column: i,
                        row: j,
                        isOccupied: false,
                        isExtend: false,
                        isWhole: false,
                    })
                }
            }
            calendarBlocks.set(i, blocks);
            blocks = [];
        }

        return calendarBlocks;

    }

    private getBlockColors(): COLORS[] {
        const colors = Object.values(COLORS);
        const shuffledColors = [...colors];
        for (let i = shuffledColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]]; // Swap elements
        }

       return shuffledColors;
    }


    private getAppointments(): Appointment[] {
        return [
            {
                id: 1,
                date: new Date('2024-07-01T09:00:00'),
                duration: 60,
                label: { id: 1, name: 'Consultation' },
                description: 'Initial consultation with the client',
                client: {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, Anytown, USA',
                    phone: '555-1234',
                    email: 'john.doe@example.com'
                },
                price: 100,
                status: AppointmentStatus.ONGOING,
                createdAt: new Date('2024-06-01T09:00:00'),
                calendarPosition: { column: 1, row: 2, rowSpan: 1 }
            },
            {
                id: 2,
                date: new Date('2024-07-02T10:00:00'),
                duration: 30,
                label: { id: 2, name: 'Follow-up' },
                description: 'Follow-up meeting',
                client: {
                    id: 2,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    address: '456 Elm St, Othertown, USA',
                    phone: '555-5678',
                    email: 'jane.smith@example.com'
                },
                price: 50,
                status: AppointmentStatus.DONE,
                createdAt: new Date('2024-06-02T10:00:00'),
                doneAt: new Date('2024-07-02T10:30:00'),
                calendarPosition: { column: 2, row: 3, rowSpan: 0 }
            },
            {
                id: 3,
                date: new Date('2024-07-03T11:00:00'),
                duration: 45,
                label: { id: 3, name: 'Therapy Session' },
                description: 'Weekly therapy session',
                client: {
                    id: 3,
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    address: '789 Oak St, Sometown, USA',
                    phone: '555-9876',
                    email: 'alice.johnson@example.com'
                },
                price: 75,
                status: AppointmentStatus.CANCELED,
                createdAt: new Date('2024-06-03T11:00:00'),
                calendarPosition: { column: 3, row: 5, rowSpan: 0 }
            },
            {
                id: 4,
                date: new Date('2024-07-03T11:00:00'),
                duration: 45,
                label: { id: 3, name: 'Therapy Session' },
                description: 'Weekly therapy session',
                client: {
                    id: 3,
                    firstName: 'Maria',
                    lastName: 'Velasquez',
                    address: '789 Oak St, Sometown, USA',
                    phone: '555-9876',
                    email: 'alice.johnson@example.com'
                },
                price: 75,
                status: AppointmentStatus.CANCELED,
                createdAt: new Date('2024-06-03T11:00:00'),
                calendarPosition: { column: 0, row: 1, rowSpan: 1 }
            },
            {
                id: 5,
                date: new Date('2024-07-03T11:00:00'),
                duration: 45,
                label: { id: 3, name: 'Therapy Session' },
                description: 'Weekly therapy session',
                client: {
                    id: 3,
                    firstName: 'Alice',
                    lastName: 'McGregor',
                    address: '789 Oak St, Sometown, USA',
                    phone: '555-9876',
                    email: 'alice.johnson@example.com'
                },
                price: 75,
                status: AppointmentStatus.CANCELED,
                createdAt: new Date('2024-06-03T11:00:00'),
                calendarPosition: { column: 0, row: 3, rowSpan: 1 }
            },
            {
                id: 6,
                date: new Date('2024-07-03T11:00:00'),
                duration: 45,
                label: { id: 3, name: 'Therapy Session' },
                description: 'Weekly therapy session',
                client: {
                    id: 3,
                    firstName: 'John',
                    lastName: 'Patrick',
                    address: '789 Oak St, Sometown, USA',
                    phone: '555-9876',
                    email: 'alice.johnson@example.com'
                },
                price: 75,
                status: AppointmentStatus.CANCELED,
                createdAt: new Date('2024-06-03T11:00:00'),
                calendarPosition: { column: 4, row: 1, rowSpan: 1 }
            },
        ];
    }
  
}