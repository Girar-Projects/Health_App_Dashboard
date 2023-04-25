import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = true;
  isSubmitting=false;
  
  loginForm = this.fb.group({
    userEmail: [null, [Validators.required,Validators.email]],
    userPassword: [null, [Validators.required,Validators.minLength(8)]],
  
  });


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService,
    public customerService:CustomersService,
  ) {}

  async ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('logged in');
        if (user.emailVerified) {
          console.log('verified');
        
       
      
          this.router.navigate(['dashboard']);

          this.toaster.success('Welcome Back ', 'Logged in Successfully!');
        } else {
          console.log('not verified');
          this.router.navigate(['verify-email']);
        }
      } else {
        this.isLoading = false;
        console.log('logged out');
       
      }
    });
  }

  submit(data:any) {
    console.log(data)
    if(!this.isSubmitting){
    if(this.loginForm.valid){
      this.isSubmitting=true;
      this.authService.SignIn(data.userEmail, data.userPassword).then((res) => {this.isSubmitting=false})
    }else{
      this.toaster.warning('Please enter valid Credentials.','Attention!')
    }

  }}
}
