import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TaskDTO } from '../../models/taskDTO';
import { ApiService } from '../../services/api.service';
import { ApiResponse } from '../../models/ApiResponse';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskComponent', () => {
  const baseUrl: string = "https://iris-test-fvhydgd0cngdethy.eastus2-01.azurewebsites.net";

  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let apiService: ApiService;

  const mockTasks: TaskDTO[] = [
    {
      id: 1, description: 'Test Task 1', isCompleted: false, deadlineAt: null,
      isFavourite: false
    },
    {
      id: 2, description: 'Test Task 2', isCompleted: true, deadlineAt: null,
      isFavourite: false
    }
  ];

  const mockApiResponse: ApiResponse<TaskDTO[]> = {
    data: mockTasks,
  };

  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TaskComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(), 
        FormBuilder,
        ApiService,
        DatePipe    
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks onInit', async () => {
    spyOn(apiService, 'getAllTask').and.returnValue(of(mockApiResponse));  
    component.getAllTask();
    expect(component.tasks.length).toBe(2); 
  });

  it('should initialize with default values', () => {
    expect(component.selectedOption).toBe('All');
    expect(component.tasks).toEqual([]);
    expect(component.showTasks).toEqual([]);
    expect(component.form).toBeDefined();
  });

  it('should filter tasks by "Done"', () => {
    component.tasks = mockTasks;
    component.selectedOption = 'Done';
    component.onSelectOption();

    expect(component.showTasks.length).toBe(1);
  });

  it('should filter tasks by "Pending"', () => {
    component.tasks = mockTasks;
    component.selectedOption = 'Pending';
    component.onSelectOption();

    expect(component.showTasks.length).toBe(1);
  });

  it('should filter tasks by "Expired"', () => {
    component.tasks = mockTasks;
    component.selectedOption = 'Expired';
    component.onSelectOption();

    expect(component.showTasks.length).toBe(0);
  });

  it('should filter tasks by "All"', () => {
    component.tasks = mockTasks;
    component.selectedOption = 'All';
    component.onSelectOption();

    expect(component.showTasks.length).toBe(2);
  });

  it('should call completeTask and update tasks', () => {
    const response: ApiResponse<number> = {data: 1}
    const completedTaskSpy = spyOn(apiService, 'completeTask').and.returnValue(of(response));  
    const getAllTaskSpy = spyOn(component, 'getAllTask');

    const task = { description: 'Task 1', isCompleted: false, deadlineAt: null } as TaskDTO;
    component.onCompleteTask(task);

    expect(completedTaskSpy).toHaveBeenCalledWith(task);
    expect(getAllTaskSpy).toHaveBeenCalled();
  });

  it('should call favouriteTask and update tasks', () => {
    const response: ApiResponse<number> = {data: 1}
    const favouriteTaskSpy = spyOn(apiService, 'favouriteTask').and.returnValue(of(response));  
    const getAllTaskSpy = spyOn(component, 'getAllTask');

    const task = { description: 'Task 1', isCompleted: false, deadlineAt: null, isFavourite: false } as TaskDTO;
    component.onFavouriteTask(task);

    expect(favouriteTaskSpy).toHaveBeenCalledWith(task);
    expect(getAllTaskSpy).toHaveBeenCalled();
  });

  it('should call deleteTask and update tasks', () => {
    const response: ApiResponse<number> = {data: 1}
    const deletedTaskSpy = spyOn(apiService, 'deleteTask').and.returnValue(of(response));  
    const getAllTaskSpy = spyOn(component, 'getAllTask');

    const task = { description: 'Task 1', isCompleted: false, deadlineAt: null, isFavourite: false } as TaskDTO;
    component.onDeleteTask(task);

    expect(deletedTaskSpy).toHaveBeenCalledWith(task);
    expect(getAllTaskSpy).toHaveBeenCalled();
  });

});
