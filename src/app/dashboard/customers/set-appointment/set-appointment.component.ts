import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.scss']
})
export class SetAppointmentComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private customerServices: CustomersService,
    public afAuth: AngularFireAuth,
    public authService:AuthService,
    public dialog: MatDialog,
    public toaster: ToasterService,
  ) {
   
  }

  phases:any[]=[]; 
  count=0
  selected: Date | null;
  setting:any;
  isLoading=true;

  async ngOnInit() {
    this.customerServices.settingData
    this.authService.castUser.subscribe((result)=>{
      if(result.uid){
        this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{
        
            res.docs.forEach(doc=>{
    
            this.customerServices.getPhases(doc.id).subscribe((res)=>{
    
              res.docs.forEach((doc:any) => {
                let phase:any=doc.data()       
                phase['uid']=doc.id ;
                
                this.phases.push(phase);
                
              }
              
              );
      
          
    
          })
          this.isLoading=false;
         
          })
          })
        })
     
    }})

  
  }

  setAppointement(customer:any,phase:any,date:any){
    let datas=customer;
    datas.phase=phase;
    
    datas.date=date;
    this.authService.castUser.subscribe((result)=>{
      this.setting=result;
      if(result.uid){
        this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{
 
            res.docs.forEach(doc=>{
              this.setting=result;
            
             
              this.customerServices.updateMember(data.companyId,customer.uid,datas).then((res)=>{
                this.toaster.info(
      
                  'Customer Info Have been Updated Successfully.','Operation Completed!'
                );
            
              }).catch((error)=>{
                this.toaster.error(
      
                  'Something Went Wrong','Operation Failed!'
                );
              })
            
          })
          })
        })

  }})
  }
}
