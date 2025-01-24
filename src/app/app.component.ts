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
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: string){
    this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  addTask(){
    if (this.newTask.name) {
      this.tasks.push(this.taskService.addTask(this.newTask))
    }
  }

}
