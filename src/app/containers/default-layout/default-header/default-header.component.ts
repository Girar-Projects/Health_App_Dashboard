import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ProfileDetailComponent } from 'src/app/pages/profile-detail/profile-detail.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  user:any
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,public authService: AuthService,   public dialog: MatDialog) {
    super();
    
    this.authService.castUser.subscribe((res)=>{
      this.user=res
    })
    
  }

  openProfilePopUp(){
    const dialogRef = this.dialog.open(ProfileDetailComponent,{
      data:this.user.uid,
      maxHeight: '90vh',
      minHeight:'40vh',
      minWidth: '40%',
      hasBackdrop:true,
  })
  }
}
