import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent, Product } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

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
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(mockProduct.name);
  });

  it('should display product price', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const priceElement = compiled.querySelector('.price');
    if (priceElement) {
      expect(priceElement.textContent).toContain(mockProduct.price.toString());
    } else {
      expect(priceElement).toBeFalsy();
    }
  });

  it('should display product description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.description').textContent).toContain(mockProduct.description);
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
      done();
    });
    component.onAddToCart();
  });

  it('should emit viewDetails event', (done) => {
    component.viewDetails.subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
      done();
    });
    component.onViewDetails();
  });

  it('should emit removeProduct event with product id', (done) => {
    component.removeProduct.subscribe((id: number) => {
      expect(id).toBe(mockProduct.id);
      done();
    });
    component.onRemoveProduct();
  });

  it('should show details section when showDetails is true', () => {
    component.showDetails = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.info')).toBeTruthy();
  });

  it('should hide details section when showDetails is false', () => {
    component.showDetails = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.info')).toBeFalsy();
  });
});
