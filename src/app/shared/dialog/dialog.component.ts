import { Component, Inject,ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogComponent {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
  approved?:boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogComponent) {}


}
