import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
DialogComponent
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
}


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(DialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }

}