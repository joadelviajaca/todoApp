import { Component, inject, Input } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.component.html'
})
export class TaskDetailsComponent {
  @Input() id!: string;

  _taskService = inject(TaskService);
  task!: Task;
  ngOnInit(): void {
    this._taskService.getTask(this.id)
    .subscribe({
      next: task => this.task = task,
      error: error => console.log(error)
    })
  }
}
