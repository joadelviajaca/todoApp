import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    {path: 'tasks', component: TaskListComponent},
    {path: 'task/:id', component: TaskDetailsComponent },
    {path: 'add-task', component: AddTaskComponent},
    {path: 'test', component: TestComponent}
];
