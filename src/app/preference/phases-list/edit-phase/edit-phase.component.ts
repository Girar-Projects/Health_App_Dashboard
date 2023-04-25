import { Component,Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.scss']
})
export class EditPhaseComponent {
  phaseData:any
  isSubmitting=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService,
    public customerService:CustomersService,
    private dialogRef: MatDialogRef<EditPhaseComponent >
  ) {
    this.phaseData=this.data
    this.phaseForm.controls.phaseTitle.setValue(this.phaseData.phaseTitle)
    this.phaseForm.controls.desc.setValue(this.phaseData.desc)
  }
  
  phaseForm = this.fb.group({
    phaseTitle: [null, [Validators.required]],
    desc: [null, [Validators.required]],
  
  });

  submit(data:any){
    if(!this.isSubmitting){
      if (this.phaseForm.valid) {
        this.isSubmitting=true;
        this.customerService.updatePhases(this.phaseData.settingId,this.phaseData.uid,data).then(
          
           (res) => {
              this.toaster.info(
      
                'Status Have been Updated Successfully.','Operation Completed!'
              );
              this.dialogRef.close()
              
              this.router.navigate(['/']).then(()=>{
                this.router.navigate(['/manage-statuses'])
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
  }}
  
