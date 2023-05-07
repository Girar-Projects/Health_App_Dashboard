import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-professional.component.html',
  styleUrls: ['./new-professional.component.scss']
})

export class NewProfessionalComponent {
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
  });

  constructor(
    private fb: FormBuilder,
    private customerServices: CustomersService,
    private authService:AuthService,
    private route: Router,
    private toastr: ToasterService,
    private authfire: AngularFireAuth
  ) {
    
  }

  async onSubmit(customerData: any) {


    if(!this.isSubmitting){
    if (this.customerRegisterForm.valid) {
      this.isSubmitting=true;
      let data=customerData

      this.authfire.authState.subscribe((res)=>{
       let uid= res?.uid

     
        this.customerServices.getSingleCustomer(res?.uid).subscribe((response) => {
          let user: any = response.data()
          this.customerServices.getSingleSetting(user.companyId).subscribe((results) => {

            results.docs.forEach(docs => {
              let settingData:any=docs.data()
              settingData.count=settingData.count+1
              data['id']=settingData.count


                    this.customerServices.addNewCustomer(data).then(
        
         async (res) => {
          await this.customerServices.updateSettingData(user.companyId,settingData)
            this.toastr.info(
    
              'New Customer Registered Successfully.','Operation Completed!'
            );
            
            this.route.navigate(['/customers-list']);
              this.isSubmitting=false;
        }
       
       
      ).catch(error=>{
        this.toastr.error(error.message, 'Attention!');
      });

            })
          })
      })

      });
    }
    else{
      this.toastr.warning('Please Enter a Valid Information', 'Attention');
    }

  }
}}
