import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html'
})
export class TaskComponent {

  @Input() task!: Task; 
  @Output() onDeleteTask: EventEmitter<string> = new EventEmitter();
  // constructor(private taskService: TaskService){}

  // Otra forma de inyectar el servicio
  private taskService: TaskService = inject(TaskService);

  completeTask(){
    this.taskService.changeTaskStatus(this.task.id, this.task.complete)
    .subscribe({
      next: task => this.task = task,
      error: error => console.log(error)
    }
    )
    // this.task.complete = !this.task.complete;
  }

  deleteTask(){
    this.onDeleteTask.emit(this.task.id);
  }
}
