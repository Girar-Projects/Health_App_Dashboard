import { Component,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-select-users-list',
  templateUrl: './select-users-list.component.html',
  styleUrls: ['./select-users-list.component.scss']
})
export class SelectUsersListComponent {
  selectedCustomer:any=[];
  displayedColumns: string[] = ['id','name', 'phone', 'gender'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource();
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog){
    this.selectedCustomer=this.data.customers
    console.log(this.selectedCustomer)
    this.dataSource.data=this.selectedCustomer
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
