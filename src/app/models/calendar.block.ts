import { Appointment } from "./appointment"

export interface CalendarBlock {
    column: number,
    row: number,
    isOccupied: boolean,
    color?: string
    appointment?: Appointment,
    isExtend: boolean,
    isWhole: boolean
}