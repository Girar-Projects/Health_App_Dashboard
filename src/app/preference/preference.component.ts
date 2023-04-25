import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CustomersService } from '../shared/services/customers.service';
import { ToasterService } from '../shared/services/toaster.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent {
  settingData:any
  isSubmitting=false;
  isLoading=true;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService,
    public customerService:CustomersService,
    
  ) {
    this.authService.castUser.subscribe((result)=>{
      if(result.uid){
        this.customerService.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerService.getSingleSetting(data.companyId).subscribe((res)=>{
            
            res.docs.forEach((results)=>{
              let data:any=results.data()
              this.settingData=data;
              this.settingData['id']=results.id
              this.settingForm.controls.organizationName.setValue(data.organizationName)
              this.settingForm.controls.address.setValue(data.address)
              this.settingForm.controls.phone.setValue(data.phone)
              this.settingForm.controls.idPrefix.setValue(data.idPrefix)
            })
            this.isLoading=false
          })
        })
    
    }
  })
   
  }
  
  settingForm = this.fb.group({
    organizationName: [null, [Validators.required]],
    address: [null, [Validators.required]],
    idPrefix:[null, [Validators.required]],
    phone: [null, [ Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern('^[0-9]*$'),]],
  
  });

  submit(settingData:any){
    if(!this.isSubmitting){
      
    if(this.settingForm.valid){
      this.isSubmitting=true;
      let data=settingData
      this.customerService.updateSettingData(this.settingData.id,settingData).then(
        
         (res) => {
            this.toaster.info(
    
              'Settings Have Been Updated Successfully.','Operation Completed!'
            );
            
            this.router.navigate(['/customers-list']);
              this.isSubmitting=false;
        }
       
       
      ).catch(error=>{
        this.toaster.error(error.message, 'Attention');
      });
    }
    else{
      this.toaster.warning('Please Enter a Valid Information', 'Attention');
    }

  }


 
} 
}
