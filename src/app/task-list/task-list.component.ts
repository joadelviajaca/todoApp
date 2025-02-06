import { Component, effect, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent, FormsModule, AsyncPipe],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit{
  tasks: Signal<Task[]>;
  message: WritableSignal<string>;

  constructor(){
    this.tasks = this.taskService.tasks;
    this.message = this.taskService.message;
  }

  newTask: Omit<Task, 'id'> = {
    name: '',
    description: '',
    complete: false
  }
  taskService: TaskService = inject(TaskService);
  
  ngOnInit(): void {
    this.fetchTasks();
  }

  
  
  fetchTasks(){
    this.taskService.getTasks()
  }

  addTask(){
    if (this.newTask.name) {
      this.taskService.addTask(this.newTask)
      .subscribe({
        next: task => this.tasks().push(task)
      })
    }
  }
}
