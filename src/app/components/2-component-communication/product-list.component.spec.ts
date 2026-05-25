import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, FormsModule, ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial products', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should add product to cart', () => {
    const product = component.products[0];
    component.onAddToCart(product);
    expect(component.cart).toContain(product);
  });

  it('should calculate cart total correctly', () => {
    component.cart = [
      { id: 1, name: 'Product 1', price: 50 },
      { id: 2, name: 'Product 2', price: 30 }
    ];
    expect(component.getCartTotal()).toBe(80);
  });

  it('should clear cart', () => {
    component.cart = [
      { id: 1, name: 'Product 1', price: 50 },
      { id: 2, name: 'Product 2', price: 30 }
    ];
    component.clearCart();
    expect(component.cart.length).toBe(0);
  });

  it('should set selected product when viewing details', () => {
    const product = component.products[0];
    component.onViewDetails(product);
    expect(component.selectedProduct).toEqual(product);
  });

  it('should remove product from products list', () => {
    const productId = component.products[0].id;
    const initialCount = component.products.length;
    component.onRemoveProduct(productId);
    expect(component.products.length).toBe(initialCount - 1);
    expect(component.products.find(p => p.id === productId)).toBeUndefined();
  });

  it('should toggle showDetails flag', () => {
    component.showDetails = false;
    expect(component.showDetails).toBe(false);
    component.showDetails = true;
    expect(component.showDetails).toBe(true);
  });

  it('should display products grid', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.products-grid')).toBeTruthy();
  });

  it('should show cart summary when cart has items', () => {
    component.cart = [{ id: 1, name: 'Product 1', price: 50 }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cart-summary')).toBeTruthy();
  });
});
