import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks: Task[] =  [
    {
      "id": "1",
      "name": "Aprender los fundamentos de React",
      "description": "Estudiar componentes, props y state",
      "complete": true
    },
    {
      "id": "2",
      "name": "Crear un sitio web personal con Next.js",
      "description": "Diseñar y desarrollar un portfolio online",
      "complete": false
    },
    {
      "id": "3",
      "name": "Dominar el lenguaje de consulta GraphQL",
      "description": "Entender cómo funciona y sus ventajas sobre REST",
      "complete": true
    },
    {
      "id": "4",
      "name": "Construir una aplicación móvil con React Native",
      "description": "Desarrollar una app para iOS y Android",
      "complete": false
    },
    {
      "id": "5",
      "name": "Implementar un sistema de autenticación con Firebase",
      "description": "Configurar usuarios, inicios de sesión y seguridad",
      "complete": true
    },
    {
      "id": "6",
      "name": "Aprender a desplegar aplicaciones en la nube",
      "description": "Utilizar plataformas como Vercel, Netlify o AWS",
      "complete": false
    },
    {
      "id": "7",
      "name": "Optimizar el rendimiento de una aplicación web",
      "description": "Reducir el tiempo de carga y mejorar la experiencia del usuario",
      "complete": false
    },
    {
      "id": "8",
      "name": "Crear una aplicación de backend con Node.js y Express",
      "description": "Desarrollar una API REST para una aplicación frontend",
      "complete": false
    },
    {
      "id": "9",      
      "name": "Escribir pruebas unitarias y de integración",
      "description": "Garantizar la calidad del código con Jest o Mocha",
      "complete": false
    },
    {
      "id": "10",
      "name": "Contribuir a un proyecto open source de JavaScript",
      "description": "Colaborar con la comunidad y aprender de otros desarrolladores",
      "complete": false
    }
  ]

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Omit<Task, 'id'>) {
    let id = this.tasks[this.tasks.length - 1].id
    let newTask = {...task, id}
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string){
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log(this.tasks)
  }

  changeTaskStatus(id: string){
    let task = this.tasks.find(task => task.id === id);
    if (task) {
      task.complete = !task.complete;
    } 
  }

}
