import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "http://localhost:3000/tasks";
  constructor(private httpClient: HttpClient) { }

  private taskSubject$ = new BehaviorSubject<Task[]>([]);
  private messageSubject$ = new BehaviorSubject<string>('');

  get message(){
    return this.messageSubject$.asObservable();
  }

  get tasks(){
    return  this.taskSubject$.asObservable();
  }

  getTasks(): void {
    this.httpClient.get<Task[]>(this.url)
    .subscribe({
      next: tasks => this.taskSubject$.next(tasks)
    })
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`)
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }

  deleteTask(id: string): void {
    this.httpClient.delete<Task>(`${this.url}/${id}`)
    .subscribe({
      // next: task => this.taskSubject$.next(this.taskSubject$.getValue().filter(task=> task.id != id)) ,
      next: task => {
        this.getTasks();
        this.messageSubject$.next('Tarea eliminada con éxito');
      },
      error: error => console.log(error)
    })
  }

  changeTaskStatus(id: string, complete: boolean): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.url}/${id}`, { complete: !complete })
  }

}
