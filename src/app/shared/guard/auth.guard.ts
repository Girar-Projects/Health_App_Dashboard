import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { CustomersService } from '../services/customers.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public customerService:CustomersService
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let user:any;
      this.authService.castUser.subscribe((result) => {
       user = result;
       
       if(user?.uid){
        this.customerService.getSingleCustomer(result.uid).subscribe((response)=>{
          let data:any=response.data()
          this.customerService.getSingleSetting(user?.uid).subscribe((res)=>{
            if(res.docs.length>0){
              res.docs.forEach(doc=>{
            
                let settingData:any = doc.data()
                settingData['uid'] = doc.id;
                console.log('already found');
                this.authService.setSetting(settingData)
              })
            }
          })
        })
   
       }
    let response= user !== null && user.emailVerified !== false ? true : false;
    
    if(response !== true) {
      this.router.navigate(['login'])
    }
  })

    // if(this.authService.afAuth.authState.subscribe())

    return true;
  }

}