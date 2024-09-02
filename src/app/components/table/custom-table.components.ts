import { Component, inject, Input } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ShortenPipe } from "../../pipes/shorten.pipe";
import { ContentHeader } from "../content-header/content-header.component";
import { TableData } from "./interfaces/table-data";
import { SelectionModel } from "@angular/cdk/collections";
import { Client } from "../../models/client";
import { BaseService } from "../../services/base.service";


@Component({
    selector: 'custom-table',
    standalone: true,
    imports: [MatTableModule, MatCheckboxModule, ContentHeader, MatPaginatorModule, MatIconModule, ShortenPipe],
    templateUrl: 'custom-table.component.html',
    styleUrl: 'custom-table.component.scss'
})
export class CustomTable {
    //baseService = inject(BaseService);


    dataSource?: any;
    initialSelection = [];
    selection: any;
    _tableData?: TableData;

    @Input() set tableData(data: TableData) {
        console.log(data)
        this._tableData = data;
        this.dataSource = new MatTableDataSource(data.content);
        this.selection = new SelectionModel<{id: number}>(true, this.initialSelection);
    }


    ngOnInit(): void {
        // console.log(this.tableData);
        // this.dataSource = new MatTableDataSource(this.tableData.content);
    }

    toggleAllRows(): void {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row: {id: number}) => this.selection.select(row));
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    checkboxLabel(row?: any): string {
        return '';
    }

    handleRowClick(row: any): void {

    }

    handleSearch(term: string): void {

    }

    handleAdd(): void {

    }

    handleSelectionDelete(): void {

    }

    handlePageChange(event: any): void {

    }

    get filteredColumns(): string[] {
        return this._tableData?.content.filter(col => col !== 'select') ?? [];
    }
}