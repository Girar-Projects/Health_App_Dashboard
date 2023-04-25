import { Component, OnInit,Inject  } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SelectUsersListComponent } from './select-users-list/select-users-list.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit{
  isLoading=true;
  templateData:any=[]

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialog: MatDialog,  
  private customerServices: CustomersService,
  public authService:AuthService){
   
    this.authService.castUser.subscribe((result:any)=>{
      if(result.uid){
        this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{

            res.docs.forEach(doc=>{
    
              this.customerServices.getTemplates(doc.id).subscribe((res)=>{
                res.docs.forEach((doc:any) => {
                  let data:any=doc.data()
        
                  data['uid']=doc.id ;
    
                  this.templateData.push(data);
                  
       
                }
                
                );
        
                this.isLoading = false;
    
            })
         
          })
          })
        })
    
    }})



  }

  ngOnInit(): void {




  }


  openDialog() {
    const dialogRef = this.dialog.open(SelectUsersListComponent,{
      data:{customers:this.data.customers},
      maxHeight: '90vh',
      minWidth: '40%',
      hasBackdrop:true,
      disableClose:true,
    });

    
  }
}
