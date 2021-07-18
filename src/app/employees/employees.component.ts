import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

import { Employee } from '../interfaces/employee';
import { EditableEmployee } from '../interfaces/editableEmployee';
import { Departments } from '../interfaces/departments';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass'],
})
export class EmployeesComponent implements OnInit {
  dataSource: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'department', 'actions'];
  @ViewChild(MatTable) table!: MatTable<Employee>;
  displayTable: boolean = true;

  marketingList: Employee[] = [];
  developmentList: Employee[] = [];

  departments: Departments[] = [
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'Development', viewValue: 'Development' },
  ];

  editableEmployee: EditableEmployee = {
    id: 0,
    editable: false,
  };
  editedEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    created: '',
  };

  editEmployee: FormGroup;

  constructor(
    private employeesService: EmployeesService,
    fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.editEmployee = fb.group({
      name: fb.control('name', Validators.required),
      email: fb.control('email', Validators.required),
      department: fb.control('department', Validators.required),
    });
  }

  ngOnInit(): void {
    this.populateEmployees();
  }

  /**
   * Gets the employees from server and fills the dataSource
   */
  populateEmployees(): void {
    this.employeesService
      .getEmployees()
      .subscribe((employees) => (this.dataSource = employees));
  }

  /**
   * Set an employee to be editable
   * @param employeeId employee to be setted
   */
  startEditing(employeeId: number): void {
    this.editableEmployee = { id: employeeId, editable: true };

    let employee = this.dataSource.find((emp) => emp.id === employeeId);
    if (employee) {
      this.editedEmployee = employee;
    }
    this.editEmployee.controls.name.setValue(employee?.name);
    this.editEmployee.controls.email.setValue(employee?.email);
    this.editEmployee.controls.department.setValue(employee?.department);
  }

  /**
   * Checks if an employee is editable
   * @param employeeId employee to be edited
   * @returns if its editable or not
   */
  isEditable(employeeId: number): boolean {
    return (
      this.editableEmployee.id === employeeId && this.editableEmployee.editable
    );
  }

  /**
   * Saves the changes of an employee
   * @param employeeId employee apdated
   */
  update(): void {
    this.editedEmployee.name = this.editEmployee.controls.name.value;
    this.editedEmployee.email = this.editEmployee.controls.email.value;
    this.editedEmployee.department =
      this.editEmployee.controls.department.value;
    this.employeesService
      .updateEmployee(this.editedEmployee)
      .subscribe((employee) => {
        console.log(employee);
        this.exitUpdate();
      });
  }

  exitUpdate(): void {
    this.editableEmployee.editable = false;
  }

  /**
   * Open dialog with the data on the employee to be removed
   * @param employeeId employee to be removed
   */
  removeEmployee(employeeId: number): void {
    let employee: Employee = this.dataSource.find(
      (emp) => emp.id === employeeId
    ) as Employee;
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '550px',
      data: { employee: employee, toRemove: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeesService.deleteEmployee(employeeId).subscribe((_) => {
          this.dataSource.forEach((element, index) => {
            if (element.id === employeeId) this.dataSource.splice(index, 1);
          });
          this.table.renderRows();
        });
      }
    });
  }

  /**
   * Open an empty dialog to create anew employee
   */
  addEmployee(): void {
    const newEmployee: Employee = {
      id: 0,
      name: '',
      email: '',
      department: '',
      created: '',
    };
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '550px',
      data: { employee: newEmployee, toRemove: false },
    });

    dialogRef.afterClosed().subscribe((createdEmployee) => {
      if (createdEmployee) {
        this.employeesService.saveEmployee(createdEmployee).subscribe((_) => {
          this.dataSource.push(createdEmployee as Employee);
          this.table.renderRows();
        });
      }
    });
  }

  /**
   * Hides the table and displays the employees explorer and fills it with the data from the table
   */
  openExplorer(): void {
    this.displayTable = false;
    this.dataSource.forEach((employee) => {
      switch (employee.department) {
        case 'Marketing':
          this.marketingList.push(employee);
          break;
        case 'Development':
          this.developmentList.push(employee);
          break;
        default:
          break;
      }
    });
  }
}
