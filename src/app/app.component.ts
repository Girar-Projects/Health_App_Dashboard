import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { ToasterService } from './shared/services/toaster.service';


@Component({
  selector: 'app-root',
  template: ' <ngx-loading-bar></ngx-loading-bar><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Reminder ET';

  constructor(
    private router: Router,
    private toaster:ToasterService,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
