import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departments } from '../interfaces/departments';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.sass'],
})
export class EmployeeDialogComponent {
  departments: Departments[] = [
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'Development', viewValue: 'Development' },
  ];
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
