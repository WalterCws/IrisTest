import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskRequestDTO } from '../models/TaskRequestDTO';
import { TaskDTO } from '../models/taskDTO';
import { ApiResponse } from '../models/ApiResponse';
import { TaskRequestFavouriteDTO } from '../models/TaskRequestFavouriteDTO';

describe('ApiService', () => {
  const baseUrl: string = "https://iris-test-fvhydgd0cngdethy.eastus2-01.azurewebsites.net";
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockResponse: ApiResponse<number> = { data: 1 };
  const task: TaskDTO = { id: 1, description: 'Task to Complete', isFavourite: false, isCompleted:false,
    deadlineAt:null
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch JWT token', () => {
    const mockResponse: ApiResponse<string> = { data: 'token' };

    service.getJWTToken().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/auth`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get all tasks', () => {
    const mockTasks = [
      { id: 1, description: 'Test Task', isFavourite: false, isCompleted: false, deadlineAt: null }
    ];

    service.getAllTask().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/todo`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const mockTask: TaskRequestDTO = { description: 'task', deadlineAt: null };

    service.createTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/todo/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.body).toEqual(mockTask);    
    req.flush(mockResponse);    
  });

  it('should complete a task', () => {   
    service.completeTask(task).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/todo/${task.id}/done`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush(mockResponse); 
  });

  it('should mark a task as favourite', () => {   
    const request: TaskRequestFavouriteDTO = { isFavourite: !task.isFavourite };

    service.favouriteTask(task).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/todo/${task.id}/favourite`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.body).toEqual(request);
    req.flush(mockResponse);
  });

  it('should delete a task', () => {  
    const mockResponse: ApiResponse<number> = { data: task.id };

    service.deleteTask(task).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/v1/todo/${task.id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush(mockResponse);
  });
});
