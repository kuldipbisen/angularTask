import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial todos', () => {
    expect(component.todos.length).toBeGreaterThan(0);
  });

  it('should add a new todo', () => {
    const initialCount = component.todos.length;
    component.newTodoText = 'Test Todo';
    component.addTodo();
    expect(component.todos.length).toBe(initialCount + 1);
    expect(component.newTodoText).toBe('');
  });

  it('should not add empty todo', () => {
    const initialCount = component.todos.length;
    component.newTodoText = '   ';
    component.addTodo();
    expect(component.todos.length).toBe(initialCount);
  });

  it('should remove a todo', () => {
    const todoId = component.todos[0].id;
    const initialCount = component.todos.length;
    component.removeTodo(todoId);
    expect(component.todos.length).toBe(initialCount - 1);
    expect(component.todos.find(t => t.id === todoId)).toBeUndefined();
  });

  it('should calculate completed count', () => {
    component.todos[0].completed = true;
    expect(component.completedCount).toBe(1);
  });

  it('should toggle todo completion status', () => {
    const todo = component.todos[0];
    const initialStatus = todo.completed;
    todo.completed = !todo.completed;
    expect(todo.completed).toBe(!initialStatus);
  });

  it('should display todos in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const items = compiled.querySelectorAll('li');
    expect(items.length).toBe(component.todos.length);
  });

  it('should show empty state when no todos', () => {
    component.todos = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  it('should display statistics', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const stats = compiled.querySelector('.stats');
    expect(stats).toBeTruthy();
  });
});
