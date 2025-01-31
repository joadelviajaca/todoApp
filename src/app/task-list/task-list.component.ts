import { Component, inject, OnInit } from '@angular/core';
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
  tasks: Task[] = [];
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

  // deleteTask(id: string){
  //   this.taskService.deleteTask(id)
  //   .subscribe({
  //     next: task => this.fetchTasks(),
  //     error: error => console.log(error)
  //   })
  // }

  addTask(){
    if (this.newTask.name) {
      this.taskService.addTask(this.newTask)
      .subscribe({
        next: task => this.tasks.push(task)
      })
    }
  }
}
