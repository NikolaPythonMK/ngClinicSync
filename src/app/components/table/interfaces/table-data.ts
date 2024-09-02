export interface TableData {
    tableTitle: string,
    content: any[],
    displayedColumns: string[],
    totalElements: number,
    errorMessage?: string,
    emptyTableMessage?: string,
    dialogData: any
}