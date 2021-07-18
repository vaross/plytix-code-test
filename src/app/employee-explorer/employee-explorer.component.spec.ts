import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExplorerComponent } from './employee-explorer.component';

describe('EmployeeExplorerComponent', () => {
  let component: EmployeeExplorerComponent;
  let fixture: ComponentFixture<EmployeeExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
