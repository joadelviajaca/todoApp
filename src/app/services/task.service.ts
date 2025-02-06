import { Injectable, signal, Signal } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "http://localhost:3000/tasks";
  constructor(private httpClient: HttpClient) {
    
   }

  
  private tasksSignal = signal<Task[]>([]);
  private messageSignal = signal<string>('');

  get tasks(){
    return this.tasksSignal.asReadonly();
  }

  get message(){
    return this.messageSignal;
  }


  

  getTasks(): void {
    this.httpClient.get<Task[]>(this.url)
    .subscribe({
      next: tasks => this.tasksSignal.set(tasks)
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
      // next: task => {
      //   this.getTasks();
      //   // this.messageSubject$.next('Tarea eliminada con éxito');
      next: task => {
        this.tasksSignal.set(this.tasks().filter(task => task.id !== id));
        this.messageSignal.set('Tarea eliminada con éxito');
        setTimeout(()=> this.messageSignal.set(''),3000)
      }
      ,
      error: error => console.log(error)
    })
  }

  changeTaskStatus(id: string, complete: boolean): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.url}/${id}`, { complete: !complete })
  }

}
