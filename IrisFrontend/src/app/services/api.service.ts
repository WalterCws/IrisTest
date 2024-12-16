import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequestDTO } from '../models/TaskRequestDTO';
import { TaskDTO } from '../models/taskDTO';
import { TaskRequestFavouriteDTO } from '../models/TaskRequestFavouriteDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://iris-test-fvhydgd0cngdethy.eastus2-01.azurewebsites.net';  // URL de la API

  private payload = {
    email: 'waltercws@hotmail.com'
  };
  // Método para obtener los usuarios desde la API
  getJWTToken(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth`, this.payload);  // Realiza la petición GET a la API
  }

  getAllTask(): Observable<any> {
    console.log("imprimir " + localStorage.getItem('jwt'))

    return this.http.get(`${this.baseUrl}/api/v1/todo`,
      {
        headers: new HttpHeaders({
          Authorization:  `Bearer ${localStorage.getItem('jwt')}`,
        }),
      }
    );
  }

  createTask(task: TaskRequestDTO): Observable<any> {   
    return this.http.post(`${this.baseUrl}/api/v1/todo/`,task,
      {
        headers: new HttpHeaders({
          Authorization:  `Bearer ${localStorage.getItem('jwt')}`,
        }),
      }
    );
  }

  completeTask(task: TaskDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/todo/${task.id}/done`,"",
      {
        headers: new HttpHeaders({
          Authorization:  `Bearer ${localStorage.getItem('jwt')}`,
        }),
      }
    );
  }

  favouriteTask(task: TaskDTO): Observable<any> {
    const payload = {
      isFavourite: !task.isFavourite
    };

    return this.http.put(`${this.baseUrl}/api/v1/todo/${task.id}/favourite`,payload,
      {
        headers: new HttpHeaders({
          Authorization:  `Bearer ${localStorage.getItem('jwt')}`,
        }),
      }
    );
  }
  
  deleteTask(task: TaskDTO): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/todo/${task.id}`,
      {
        headers: new HttpHeaders({
          Authorization:  `Bearer ${localStorage.getItem('jwt')}`,
        }),
      }
    );
  }
}

