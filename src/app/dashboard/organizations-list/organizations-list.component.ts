import { AfterViewInit, Component, ViewChild, OnInit,ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { SendMessageComponent } from '../customers/send-message/send-message.component';
import { EditProfessionalComponent } from '../customers/edit-professional/edit-professional.component';
import { SetAppointmentComponent } from '../customers/set-appointment/set-appointment.component';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  email: string;
}



@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrganizationsListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'fullName',
    'phone',
    'status',
    'date',
    'actions'
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  customer: any[] = [];
  settings: any
  filterDataPhase: any[] = [];
  filterDate: any[] = [];
  phases: any[] = [];
  dateFiltered: boolean = false;
  phaseFiltered: boolean = false;
  count = 0
  isLoading = true;
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }



  constructor(
    private customerServices: CustomersService,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public dialog: MatDialog
  ) { }


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    this.customerServices.settingData
    this.authService.castUser.subscribe((result) => {
      if (result?.uid) {
        this.customerServices.getSingleCustomer(result.uid).subscribe((response) => {
          let user: any = response.data()
          this.customerServices.getSingleSetting(user.companyId).subscribe((results) => {

            results.docs.forEach(docs => {

              this.settings = docs.data()
              this.customerServices.getRequests(docs.id).subscribe((res) => {
                res.docs.forEach((doc: any) => {
                  let data: any = doc.data()

                  data['uid'] = doc.id;

                  data['settingId'] = docs.id;
                  data['phase'] = doc.data().phase ? doc.data().phase : '-';
                  data['date'] = doc.data().date ? doc.data().date : '-';
                  data['fullName'] = doc.data().firstName + " " + doc.data().lastName
                  

                  this.customer.push(data);


                }

                );

                this.dataSource.data = this.customer
                this.dataSource.paginator = this.paginator
                this.isLoading = false;

  this.noDataErrorMessage()

              })

              this.customerServices.getPhases(docs.id).subscribe((res) => {

                res.docs.forEach((doc: any) => {
                  let phase: any = doc.data()
                  phase['uid'] = doc.id;

                  this.phases.push(phase);

                }

                );



              })

            })
          })
        })

      }
    
    })

  }

  ngAfterViewInit() {
    this.noDataErrorMessage()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.noDataErrorMessage()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  selection = new SelectionModel<UserData>(true, []);

  /** CheckBOx funtions */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  openDialog() {
    const dialogRef = this.dialog.open(SendMessageComponent, {
      data: { customers: this.selection.selected },
      maxHeight: '90vh',
      minHeight: '30vh',
      minWidth: '45%',
      hasBackdrop: true,
      disableClose: true,
    });



  }




  async filterPhaseChange(event: any) {


    let filtered: any[] = []
    if (this.dateFiltered) {
      console.log("date found")

      filtered = this.filterDate


    } else {
      console.log("date is not found")
      filtered = this.customer
    }

    if (event.value != '_ALL') {
      if (event.value == '-') {
        this.filterDataPhase = await _.filter(filtered, (item) => {

          return item?.phase.toLowerCase() == event.value.toLowerCase();
        })
        this.dataSource = new MatTableDataSource(this.filterDataPhase)


      }
      else {


        this.filterDataPhase = await _.filter(filtered, (item) => {

          return item?.phase.toLowerCase() == event.value.toLowerCase();
        })


        this.dataSource = new MatTableDataSource(this.filterDataPhase)
      }
      this.phaseFiltered = true;
    }

    else {
      this.filterDataPhase = []
      this.phaseFiltered = false;
      if (this.dateFiltered) {
        console.log("Set data back to similar with date")
        this.dataSource = new MatTableDataSource(this.filterDate)
      } else {

        console.log("List Customers from server")
        this.dataSource = new MatTableDataSource(this.customer)
      }

    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


    this.noDataErrorMessage()
    this.setDataSourceAttributes();
  }




  async filterDateChange(startDate: any, endDate: any) {
    let starDateFormatted = new Date(startDate)
    let endDateFormatted = new Date(endDate)

    if (startDate) {
      console.log("startedate found")
      let filtered: any[] = []
      if (this.phaseFiltered) {
        console.log("phase found")
        filtered = this.filterDataPhase
       

      } else {
        console.log("phase is not found")
        filtered = this.customer
      }

      this.filterDate = await _.filter(filtered, (item) => {
        let itemDate = new Date(item?.date)
        if (endDate) {

          return itemDate >= starDateFormatted && itemDate <= endDateFormatted;
        } else {

          return itemDate >= starDateFormatted;
        }
      })
      this.dataSource = new MatTableDataSource(this.filterDate)

      this.dateFiltered = true

    } else {
      this.filterDate = []
      this.dateFiltered = false
      if (this.phaseFiltered) {
        this.dataSource = new MatTableDataSource(this.filterDataPhase)
      } else {
        this.dataSource = new MatTableDataSource(this.customer)
      }

    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.noDataErrorMessage()
  }

    noDataErrorMessage() {
    setTimeout(() => {
      const error: any = document.getElementById('error')
      if(error){
        if (document.getElementsByClassName('test').length > 0||this.customer.length<=0) {
          error.style.display = 'block'
        } else {
          error.style.display = 'none'
        }
      }
   
    }, 0.1)
    this.setDataSourceAttributes();
  }





  clearDate(phase: any) {
    console.log("Clear data with phase", phase.value)
    this.range.reset()
    this.dateFiltered = false;
    if (this.phaseFiltered) {
      this.filterPhaseChange(phase)
    } else {
      this.filterPhaseChange({ value: '_ALL' })
    }


  }


  setAppointment(data: any) {
    const dialogRef = this.dialog.open(SetAppointmentComponent, {
      data: { customer: data },
      maxHeight: '90vh',
      minHeight: '30vh',
      minWidth: '45%',

    });
  }
  editCustomer(data: any) {
    const dialogRef = this.dialog.open(EditProfessionalComponent, {
      data: { customer: data },
      maxHeight: '90vh',
      minHeight: '30vh',
      minWidth: '45%',

    });
  }
}


