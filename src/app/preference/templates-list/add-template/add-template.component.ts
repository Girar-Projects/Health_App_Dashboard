import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent {
  isSubmitting=false;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService,
    public customerService:CustomersService,
    private dialogRef: MatDialogRef<AddTemplateComponent >
  ) {}
  
  templateForm = this.fb.group({
    templateTitle: [null, [Validators.required]],
    templateBody: [null, [Validators.required]],
  
  });

  submit(data:any){
    if(!this.isSubmitting){
      if (this.templateForm.valid) {
        this.isSubmitting=true;
        this.customerService.addNewTemplate(data).then(
          
           (res) => {
              this.toaster.info(
      
                'New Template Have been added Successfully.','Operation Completed!'
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
