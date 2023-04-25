import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {

  isLoading=true;
  userData:any;

  constructor(  public authService:AuthService,  public afAuth: AngularFireAuth,public router:Router) {
    this.afAuth.authState.subscribe((user) => {
      this.userData=user;
      if (user) {
        if(user.emailVerified){
          this.router.navigate(['dashboard'])
        }
        else{
          this.isLoading=false;
        
        }
        
       
      } else {
        this.router.navigate(['login'])
       
    }});

 
}


}
