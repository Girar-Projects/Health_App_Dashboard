import { Injectable } from '@angular/core';
declare let toastr: any;
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
   options= { positionClass:'toast-custom' ,closeButton: true,progressBar: true,preventDuplicates: true,newestOnTop: true};
      

  success(message: string, title?: string) {
    toastr.success(message, title,this.options);
  }

  info(message: string, title?: string) {
    toastr.info(message, title,this.options);
  }

  warning(message: string, title?: string) {
    toastr.warning(message, title,this.options);
  }

  error(message: string, title?: string) {
    toastr.error(message, title,this.options);
  }

  errorLogin(message: string, title?: string) {
    toastr.error(message, title,{ closeButton: true,progressBar: true,preventDuplicates: true,newestOnTop: true});
  }
  remove(){
    toastr.remove()
  }
  constructor() {}
}