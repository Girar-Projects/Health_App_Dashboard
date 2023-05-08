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
  selector: 'app-new-organization',
  templateUrl: './new-organization.component.html',
  styleUrls: ['./new-organization.component.scss']
})

export class NewOrganizationComponent {
  isSubmitting=false;


  customerRegisterForm = this.fb.group({
    fullName: [null, Validators.required],
    orgName: [null, Validators.required],
    orgType: [null, Validators.required],
    typeOfProfessional: [null, Validators.required],
    workPlace: [null, Validators.required],
    experience: [null, Validators.required],
    totalNeeded: [null, Validators.required],
    tinNumber: [null, Validators.required],
    email: [null,  [Validators.email]],
    gender: [null, Validators.required],
    phone: [      '',      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    status:['pending'],
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
              settingData.count=settingData.requestCount+1
              data['id']=settingData.count


                    this.customerServices.addNewRequest(data).then(
        
         async (res) => {
          await this.customerServices.updateSettingData(user.companyId,settingData)
            this.toastr.info(
    
              'New Recruit Request submitted Successfully.','Operation Completed!'
            );
            
            this.route.navigate(['/professional-list']);
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
