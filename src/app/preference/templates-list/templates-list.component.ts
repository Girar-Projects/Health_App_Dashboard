import { Component } from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTemplateComponent } from './add-template/add-template.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { template } from 'lodash';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';


@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TemplatesListComponent {
  isLoading = true;
  dataSource: MatTableDataSource<any>=new MatTableDataSource();
  columnsToDisplay = ['id','templateTitle', 'options'];
  expandColumons = ['id','templateTitle'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  count=0;
  templateData:any=[]
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
      if(result.uid){
        this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{
            this.setting=res
            res.docs.forEach(docs=>{
    
              this.customerServices.getTemplates(docs.id).subscribe((res)=>{
                res.docs.forEach((doc:any) => {
                  let data:any=doc.data()
        
                  data['uid']=doc.id ;
                  data['settingId']=docs.id
                  data['id']=++this.count;
    
                  this.templateData.push(data);
                  
       
                }
                
                );
                this.dataSource.data=this.templateData
                this.isLoading = false;
    
            })
         
          })
          })
        })

    }})


  }

  
  addTemplate() {
    const dialogRef = this.dialog.open(AddTemplateComponent,{
      maxHeight: '90vh',
      minHeight:'40vh',
      minWidth: '60%',
      hasBackdrop:true,
      disableClose:true,
  })
}

editTemplate(tempalteData:any) {
  const dialogRef = this.dialog.open(EditTemplateComponent,{
    data:tempalteData,
    maxHeight: '90vh',
    minHeight:'40vh',
    minWidth: '60%',
    hasBackdrop:true,
    disableClose:true,
})
}



onDelete(templateData:any){
  this.confirmDialog.confirmDialog({
    title: 'Are you sure?',
    message: 'You want to Delete this Template?',
    confirmCaption: 'YES',
    cancelCaption: 'NO',
  }).subscribe((yes)=>{
    if(yes){
      this.customerServices.deleteTemplates(templateData.settingId,templateData.uid)

      .then((res)=>{
        this.toaster.info(
      
          'Template Have been DELETED Successfully.','Operation Completed!'
        );
        this.router.navigate(['/']).then(()=>{
          this.router.navigate(['/manage-templates'])
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

