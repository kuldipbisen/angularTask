# Testing Best Practices for Angular Components

## Unit Testing Guidelines

### 1. Component Testing
- Always test component initialization
- Test user interactions and event bindings
- Verify change detection and property bindings
- Test lifecycle hooks behavior

### 2. Testing Async Operations
Use `fakeAsync` and `tick` for timing-dependent tests:
```typescript
it('should update after async operation', fakeAsync(() => {
  component.loadData();
  tick();
  expect(component.data).toBeDefined();
}));
``` 

### 3. Mocking Dependencies
- Mock services using `jasmine.createSpyObj()`
- Use `TestBed.inject()` to provide mocks
- Verify service method calls with `toHaveBeenCalled()`

### 4. Testing Input and Output
```typescript
it('should emit event with data', () => {
  spyOn(component.dataChange, 'emit');
  component.updateData(testData);
  expect(component.dataChange.emit).toHaveBeenCalledWith(testData);
});
```

## Coverage Goals
- Aim for at least 80% code coverage
- Focus on critical business logic
- Test edge cases and error scenarios
- Include integration tests for complex features

## Common Testing Patterns

### Testing @Input Properties
```typescript
component.inputData = testValue;
fixture.detectChanges();
expect(component.someValue).toBe(expectedValue);
```

### Testing @Output Events
```typescript
const spy = spyOn(component.eventEmitter, 'emit');
component.triggerEvent();
expect(spy).toHaveBeenCalled();
```

### Testing Directives and Structural Elements
```typescript
const compiled = fixture.nativeElement;
expect(compiled.querySelector('.my-class')).toBeTruthy();
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- --include='**/component.spec.ts'
```
