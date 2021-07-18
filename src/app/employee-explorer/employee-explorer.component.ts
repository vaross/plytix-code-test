import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-employee-explorer',
  templateUrl: './employee-explorer.component.html',
  styleUrls: ['./employee-explorer.component.sass'],
})
export class EmployeeExplorerComponent implements OnChanges {
  @Input() marketingList: Employee[] = [];
  @Input() developmentList: Employee[] = [];

  developmentEmployees: Employee[] = [];
  marketingEmployees: Employee[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.developmentEmployees = changes.developmentList.currentValue;
    this.marketingEmployees = changes.marketingList.currentValue;
    this.developmentList = changes.developmentList.currentValue;
    this.marketingList = changes.marketingList.currentValue;
  }

  /**
   * Gives an rank of proficency to an employee by its experience
   * @param experience employee experience
   * @returns rank
   */
  getProficency(experience: string): string {
    const experienceDate = Date.parse(experience);
    const today = Date.now();
    const daysOfExperience = (today - experienceDate) / (1000 * 3600 * 24);
    if (daysOfExperience > 3) {
      return 'Expert';
    } else if (daysOfExperience >= 2) {
      return 'Senior';
    } else if (daysOfExperience > 1) {
      return 'Advanmced';
    } else {
      return 'Experienced';
    }
  }

  /**
   * filter the employees for the development department
   * @param event input given
   */
  searchDevelopmentEmployee(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.developmentEmployees = this.developmentList.filter(
      (employee) =>
        employee.name.includes(filterValue) ||
        employee.email.includes(filterValue)
    );
  }

  /**
   * filter the employees for the marketing department
   * @param event input given
   */
  searchMarketingEmployee(event: Event) {
    console.log(this.marketingList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.marketingEmployees = this.marketingList.filter(
      (employee) =>
        employee.name.includes(filterValue) ||
        employee.email.includes(filterValue)
    );
  }
}
