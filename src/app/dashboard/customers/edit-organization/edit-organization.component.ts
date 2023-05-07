import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent {

  isSubmitting=false;


  customerRegisterForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null,  [Validators.email]],
    gender: [null, Validators.required],
    phone: [      '',      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    date:[''],
    phase:[''],
    status:['']
  });
status=false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private fb: FormBuilder,
  private customerServices: CustomersService,
  public afAuth: AngularFireAuth,
  public authService:AuthService,
  public dialog: MatDialog,
  public router:Router,
   public toaster: ToasterService,
   public dialogRef: MatDialogRef<EditOrganizationComponent >
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
              this.isLoading=false;
            }
            
            );
    
        
  
        })
        
       
        })
        })
      })
   
  }})
this.customerRegisterForm.controls.firstName.setValue(this.data.customer.firstName)
this.customerRegisterForm.controls.lastName.setValue(this.data.customer.lastName)
this.customerRegisterForm.controls.gender.setValue(this.data.customer.gender)
this.customerRegisterForm.controls.phone.setValue(this.data.customer.phone)
this.customerRegisterForm.controls.email.setValue(this.data.customer?.email)
this.customerRegisterForm.controls.phase.setValue(this.data.customer?.phase)
this.customerRegisterForm.controls.date.setValue(this.data.customer?.date)
if(this.data.customer?.status=='Fraud'){
  this.status=true;
}
}

onSubmit(customer:any){
  let datas=customer;

  if(this.status){
  datas['status']='Fraud'
  }else{
    datas['status']='Legit'
  }
  this.isSubmitting=true;
  this.authService.castUser.subscribe((result)=>{
    this.setting=result;
    if(result.uid){
      this.customerServices.getSingleCustomer(result.uid).subscribe((response)=>{
        let data:any=response.data()
        this.customerServices.getSingleSetting(data.companyId).subscribe((res)=>{

          res.docs.forEach(doc=>{
            this.setting=result;
          
            this.customerServices.updateMember(data.companyId,this.data.customer.uid,datas).then((res)=>{
              this.toaster.info(
      
                'Customer Info Have been Updated Successfully.','Operation Completed!'
              );
              this.dialogRef.close()
          
              
              this.router.navigate(['/']).then(()=>{
                this.router.navigate(['/professional-list'])
              });
            }).catch((error)=>{
              console.log(error)
            })
          
        })
        })
      })

}})
}
}

