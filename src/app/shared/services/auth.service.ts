import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { CustomersService } from 'src/app/shared/services/customers.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  public user = new BehaviorSubject<any>({});
  castUser = this.user.asObservable();


  public settingData = new BehaviorSubject<any>({});
  castSetting = this.settingData.asObservable();

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public toaster:ToasterService,
    private firestore: AngularFirestore,
  ) {
        /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
       
        this.user.next(user)
        
      } else {
        this.user.next(null)
        
      }
    });


   
  }

  setSetting(filters: any) {
    this.settingData.next(filters);
  }


  getSingleUser(id:any) {

    return this.firestore.collection("users").doc(id).get();
  }

  

  updateUserData(id:any,data:any) {
    let send={
      settingId:data
    }
    return this.firestore.collection("users/").doc(id).set(send);
  }



 
  // Sign in with email/password
  SignIn(email: string, password: string) {
   
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            if(user.emailVerified){
              this.getSingleUser(user.uid).subscribe((userRes)=>{

               
    
                let data:any=userRes.data();
                if(data?.settingId){
                  
                }
    
              });
            this.router.navigate(['dashboard']);
            this.toaster.success("Welcome Back ","Logged in Successfully!")
           
          }else{
            this.router.navigate((['Verify-email']))
          }
     
          }
        });
      })
      .catch((error) => {
  
        this.toaster.errorLogin(error.message,"Error Occurred!")

      });
   
  }


  // Sign up with email/password
  SignUp(email: string, password: string,compnayId:any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();

        this.SetUserData(result.user);
        let user=result.user
        let dataSent = {
          companyId:compnayId,
          organizationName: 'ET Reminders',
          address: '',
          phone: '',
          count:0
        };
    
        this.firestore.collection('ET_Reminders').doc(compnayId).set(dataSent,{merge: true});

        this.firestore.collection('users').doc(user?.uid).update({companyId:compnayId}).then(()=>{
          console.log('created');
          
          this.router.navigate(['verify-email']);
        })
      
       
        })
  

  }




  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }



  
  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toaster.success("Password reset email sent, check your inbox. ","Operation Successful")
      })
      .catch((error) => {
         this.toaster.errorLogin(error.message,"Error Occurred!")
      });
  }




  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let user :any;
    this.castUser.subscribe((result) => {
      this.user = result;})
    return user !== null && user.emailVerified !== false ? true : false;
  }




  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }



  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toaster.errorLogin(error.message,"Error Occurred!")
      });
  }



  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  */

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    
    this.user.next(userData)
    return userRef.set(userData, {
      merge: true,
    });
  }



  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }


}