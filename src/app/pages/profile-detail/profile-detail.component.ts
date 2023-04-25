import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  settingData:any
  constructor(@Inject(MAT_DIALOG_DATA) public user: ProfileDetailComponent,
  private customerServices: CustomersService) {}

  ngOnInit(): void {

    this.customerServices.getSingleSetting(this.user).subscribe((res)=>{
      res.docs.forEach((doc)=>{
        this.settingData=doc.data()
      })
    })



  }
}
