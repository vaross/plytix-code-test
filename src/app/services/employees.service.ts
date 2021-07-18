import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employeesUrl = 'http://34.241.217.201/users_avd/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(private http: HttpClient) {}

  /**GEt employees from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeesUrl)
      .pipe(tap((res) => console.log(res)));
  }

  /**
   * Sends the updated employee to the server
   * @param employee updated employee
   * @returns
   */
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http
      .put<Employee>(url, employee, this.httpOptions)
      .pipe(tap((_) => console.log('updated employee ' + employee.id)));
  }

  /**
   * Stores a new employee in the server
   * @param employee new employee to be stored
   * @returns new employee stored
   */
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) => {
          console.log('added new employee ' + newEmployee.id);
        })
      );
  }

  deleteEmployee(employeeId: number): Observable<unknown> {
    const url = `${this.employeesUrl}/${employeeId}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => {
        console.log('deleted employee ' + employeeId);
      })
    );
  }
}
