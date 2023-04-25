import { Component,Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Input } from 'postcss';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';


@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent {
  template:any;
  isSubmitting=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService,
    public customerService:CustomersService,
    private dialogRef: MatDialogRef<EditTemplateComponent >
  ) {
     this.template=this.data
    this.templateForm.controls.templateTitle.setValue(this.template.templateTitle)
    this.templateForm.controls.templateBody.setValue(this.template.templateBody)
  }
  
  templateForm = this.fb.group({
    templateTitle: [null, [Validators.required]],
    templateBody: [null, [Validators.required]],
  
  });

  submit(data:any){
    if(!this.isSubmitting){
      if (this.templateForm.valid) {
        this.isSubmitting=true;
         this.customerService.updateTemplates(this.template.settingId,this.template.uid,data).then(
          
           (res) => {
              this.toaster.info(
      
                'Template Have been Updated Successfully.','Operation Completed!'
              );
              this.dialogRef.close()
              
              this.router.navigate(['/']).then(()=>{
                this.router.navigate(['/manage-templates'])
              });
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

