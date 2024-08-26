export enum AlertType {
    DANGER = 'dangerous',
    WARNING = 'warning',
    INFO = 'info'
}

export interface ConfirmationDialogData {
    title: string,
    text: string
    alert: AlertType
}