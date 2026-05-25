/**
 * COMPONENT TESTING EXAMPLES
 * 
 * This file demonstrates best practices for unit testing Angular components
 * including:
 * - Testing component initialization
 * - Testing input and output properties
 * - Testing event handling
 * - Testing lifecycle hooks
 * - Mocking child components
 * - Testing template rendering
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Import components to test
import { CounterComponent } from './1-basic-components/counter.component';
import { ProductCardComponent, type Product } from './2-component-communication/product-card.component';

/**
 * COUNTER COMPONENT TESTS
 * 
 * Demonstrates:
 * - Component initialization
 * - Testing methods
 * - Testing template rendering
 * - User interactions
 */
describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  // Setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  // Test 1: Component should create
  it('should create the counter component', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Initial count should be 0
  it('should initialize count to 0', () => {
    expect(component.count).toBe(0);
  });

  // Test 3: Increment method should increase count
  it('should increment count when increment() is called', () => {
    component.increment();
    expect(component.count).toBe(1);

    component.increment();
    expect(component.count).toBe(2);
  });

  // Test 4: Decrement method should decrease count
  it('should decrement count when decrement() is called', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  // Test 5: Decrement should not go below 0
  it('should not decrement below 0', () => {
    component.count = 0;
    component.decrement();
    expect(component.count).toBe(0);
  });

  // Test 6: Reset method should set count to 0
  it('should reset count to 0', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });

  // Test 7: Template should display count
  it('should display count in template', () => {
    component.count = 5;
    fixture.detectChanges();

    const countDisplay = debugElement.query(By.css('strong'));
    expect(countDisplay.nativeElement.textContent).toBe('5');
  });

  // Test 8: Button click should call increment
  it('should increment when increment button is clicked', () => {
    const incrementButton = debugElement.queryAll(By.css('button'))[0];
    
    expect(component.count).toBe(0);
    
    incrementButton.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.count).toBe(1);
  });

  // Test 9: Warning message should appear when count > 5
  it('should display warning message when count > 5', () => {
    component.count = 6;
    fixture.detectChanges();

    const warningMsg = debugElement.query(By.css('.warning'));
    expect(warningMsg).toBeTruthy();
    expect(warningMsg.nativeElement.textContent).toContain('greater than 5');
  });

  // Test 10: Success message should appear when count === 10
  it('should display success message when count === 10', () => {
    component.count = 10;
    fixture.detectChanges();

    const successMsg = debugElement.query(By.css('.success'));
    expect(successMsg).toBeTruthy();
    expect(successMsg.nativeElement.textContent).toContain('You reached 10');
  });
});

/**
 * PRODUCT CARD COMPONENT TESTS
 * 
 * Demonstrates:
 * - Testing @Input properties
 * - Testing @Output events (EventEmitter)
 * - Testing component communication
 * - Mocking parent behavior
 */
describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let debugElement: DebugElement;

  // Mock product data
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    description: 'Test Description'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  // Test 1: Component should create
  it('should create the product card component', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: @Input should set product
  it('should accept product input', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    expect(component.product).toEqual(mockProduct);
    expect(component.product.name).toBe('Test Product');
  });

  // Test 3: Product name should display
  it('should display product name in template', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const productName = debugElement.query(By.css('h3'));
    expect(productName.nativeElement.textContent).toContain('Test Product');
  });

  // Test 4: Product price should display
  it('should display product price in template', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const priceSpan = debugElement.query(By.css('.price'));
    expect(priceSpan.nativeElement.textContent).toContain('99.99');
  });

  // Test 5: @Output addToCart should emit
  it('should emit addToCart event when button clicked', (done) => {
    component.product = mockProduct;

    // Subscribe to the output event
    component.addToCart.subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    // Call the method
    component.onAddToCart();
  });

  // Test 6: @Output viewDetails should emit
  it('should emit viewDetails event when button clicked', (done) => {
    component.product = mockProduct;

    component.viewDetails.subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    component.onViewDetails();
  });

  // Test 7: @Output removeProduct should emit
  it('should emit removeProduct event with product id', (done) => {
    component.product = mockProduct;

    component.removeProduct.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });

    component.onRemoveProduct();
  });

  // Test 8: ShowDetails input should control display
  it('should show product details when showDetails is true', () => {
    component.product = mockProduct;
    component.showDetails = true;
    fixture.detectChanges();

    const infoDiv = debugElement.query(By.css('.info'));
    expect(infoDiv).toBeTruthy();
  });

  // Test 9: ShowDetails input should hide details when false
  it('should hide product details when showDetails is false', () => {
    component.product = mockProduct;
    component.showDetails = false;
    fixture.detectChanges();

    const infoDiv = debugElement.query(By.css('.info'));
    expect(infoDiv).toBeFalsy();
  });
});

/**
 * TESTING BEST PRACTICES
 * 
 * 1. Arrange-Act-Assert Pattern
 *    - Arrange: Set up test data and components
 *    - Act: Perform the action being tested
 *    - Assert: Verify the expected outcome
 * 
 * 2. Test Names
 *    - Use "should" statement format
 *    - Be descriptive and specific
 *    - Test one thing per test
 * 
 * 3. Component Testing
 *    - Create component with TestBed
 *    - Use fixture.detectChanges() to trigger change detection
 *    - Query template with debugElement or fixture
 *    - Test both component logic and template
 * 
 * 4. Event Testing
 *    - Subscribe to @Output EventEmitters
 *    - Use jasmine done() callback for async operations
 *    - Verify emitted values
 * 
 * 5. Mock Data
 *    - Create realistic test data
 *    - Use constants for reusable data
 *    - Test with multiple data variations
 * 
 * 6. DOM Testing
 *    - Query elements with By.css()
 *    - Check visibility and content
 *    - Simulate user interactions
 *    - Verify CSS classes and styles
 */

/**
 * TESTING UTILITIES
 */

// Helper function to query by CSS selector
export function queryByCss(fixture: ComponentFixture<any>, selector: string): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

// Helper function to query all by CSS selector
export function queryAllByCss(
  fixture: ComponentFixture<any>,
  selector: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}

// Helper function to trigger change detection and check value
export function setInputAndDetectChanges(
  fixture: ComponentFixture<any>,
  component: any,
  property: string,
  value: any
): void {
  component[property] = value;
  fixture.detectChanges();
}

// Helper function for async operations
export function waitForAsync(fn: () => void): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, 0);
  });
}

/**
 * RUNNING TESTS
 * 
 * npm test                  - Run all tests
 * npm run test:watch       - Run tests in watch mode
 * npm run test:coverage    - Run tests with coverage report
 * 
 * Test Output:
 * ✓ test should pass
 * ✕ test should fail
 * ⚠ test should skip
 */
