import { Component, inject, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { Task } from './interfaces/task';
import { TaskService } from './services/task.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  imports: [TaskComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'todoApp';
  tasks: Task[] = [];
  newTask: Omit<Task, 'id'> = {
    name: '',
    description: '',
    complete: false
  }
  private taskService: TaskService = inject(TaskService);

  ngOnInit(): void {
    this.fetchTasks();
  }
  
  fetchTasks(){
    this.taskService.getTasks()
    .subscribe({
      next: tasks => this.tasks = tasks,
      error: error => console.log(error)
    })
  }

  deleteTask(id: string){
    this.taskService.deleteTask(id)
    .subscribe({
      next: task => this.fetchTasks(),
      error: error => console.log(error)
    })
  }

  addTask(){
    if (this.newTask.name) {
      this.taskService.addTask(this.newTask)
      .subscribe({
        next: task => this.tasks.push(task)
      })
    }
  }

}
