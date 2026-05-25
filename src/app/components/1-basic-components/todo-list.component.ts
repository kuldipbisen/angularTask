import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * TODO LIST COMPONENT
 * 
 * This component demonstrates:
 * - Working with arrays and lists
 * - Two-way data binding using ngModel
 * - Structural directives (*ngFor, *ngIf)
 * - Conditional CSS classes
 * 
 * Learning Goals:
 * - Understand how to manage collections in components
 * - Learn about two-way binding
 * - Work with DOM lists dynamically
 */
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos: Todo[] = [
    { id: 1, text: 'Learn Angular Components', completed: true },
    { id: 2, text: 'Understand Lifecycle Hooks', completed: false },
    { id: 3, text: 'Master Component Communication', completed: false }
  ];

  newTodoText: string = '';
  nextId: number = 4;

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: this.nextId++,
        text: this.newTodoText,
        completed: false
      });
      this.newTodoText = '';
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
