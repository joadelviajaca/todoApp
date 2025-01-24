import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url : string = "http://localhost:3000/tasks";
  constructor(private httpClient: HttpClient) { }


  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url);
  }

  getTask(id: string): Observable<Task>{
    return this.httpClient.get<Task>(`${this.url}/${id}`)
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task>{
    return this.httpClient.post<Task>(this.url, task);
  }

  deleteTask(id: string): Observable<Task>{
    return this.httpClient.delete<Task>(`${this.url}/${id}`)
  }

  changeTaskStatus(id: string, complete: boolean): Observable<Task>{
    return this.httpClient.patch<Task>(`${this.url}/${id}`, {complete: !complete} )
  }

}
