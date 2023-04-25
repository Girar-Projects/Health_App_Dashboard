import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { AddPhaseComponent } from './add-phase/add-phase.component';
import { EditPhaseComponent } from './edit-phase/edit-phase.component';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Router } from '@angular/router';

export interface phaseType {
  phaseTitle: string;
  position: number;
  desc: string;

}


@Component({
  selector: 'app-phases-list',
  templateUrl: './phases-list.component.html',
  styleUrls: ['./phases-list.component.scss'],
})
export class PhasesListComponent {
  isLoading = true;
  displayedColumns: string[] = ['position', 'name', 'definition', 'options'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource();
  phaseData:any=[];
  count=0;
  setting:any;

  
  constructor(
    private customerServices: CustomersService,
    public afAuth: AngularFireAuth,
    public authService:AuthService,
    public dialog: MatDialog,
    public router: Router,
    public toaster: ToasterService,
    public confirmDialog:DialogService
  ) {
    this.authService.castUser.subscribe((result)=>{
      this.setting=result;
      if(result.uid){
        this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{

            res.docs.forEach(docs=>{
    
              this.customerServices.getPhases(docs.id).subscribe((res)=>{
                res.docs.forEach((doc:any) => {
                  let data:any=doc.data()
        
                  data['uid']=doc.id ;
                  data['settingId']=docs.id
                  data['id']=++this.count;
    
                  this.phaseData.push(data);
                  
       
                }
                
                );
                this.dataSource.data=this.phaseData
                this.isLoading = false;
    
            })
         
          })
          })
        })

    }})


  }

  @ViewChild(MatTable) table: MatTable<any>;

  addPhase() {
    const dialogRef = this.dialog.open(AddPhaseComponent,{
      maxHeight: '90vh',
      minHeight:'35vh',
      minWidth: '55%',
      hasBackdrop:true,
      disableClose:true,
  })
}

editPhase(phaseData:any) {
  const dialogRef = this.dialog.open(EditPhaseComponent,{
    data:phaseData,
    maxHeight: '90vh',
    minHeight:'40vh',
    minWidth: '60%',
    hasBackdrop:true,
    disableClose:true,
})
}


onDelete(phaseData:any){
  this.confirmDialog.confirmDialog({
    title: 'Are you sure?',
    message: 'You want to Delete this Status?',
    confirmCaption: 'YES',
    cancelCaption: 'NO',
  }).subscribe((yes)=>{
    if(yes){
      this.customerServices.deletePhase(phaseData.settingId,phaseData.uid)

      .then((res)=>{
        this.toaster.info(
      
          'Status Have been DELETED Successfully.','Operation Completed!'
        );
        this.router.navigate(['/']).then(()=>{
          this.router.navigate(['/manage-statuses'])
        });
      }).catch((error)=>{
        this.toaster.error(
      
          'Error Has Occured!','Operation Failed!'
        );
      })
    }
  })
}
}
