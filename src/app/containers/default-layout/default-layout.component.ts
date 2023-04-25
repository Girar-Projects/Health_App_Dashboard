import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  isLoading = true;
  public navItems = navItems;

  constructor(
    public authService: AuthService,
    public customerService: CustomersService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public toaster: ToasterService
  ) {
    this.afAuth.authState.subscribe((user) => {
      let uid = user?.uid;
      if (user) {
        if (!user.emailVerified) {
          this.router.navigate(['Verify-email']);
        }
      } else {

        this.isLoading=false;
      }
    });
  }
}
