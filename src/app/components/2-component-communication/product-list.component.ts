import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent, Product } from './product-card.component';

/**
 * PRODUCT LIST COMPONENT (Parent Component)
 * 
 * This component demonstrates:
 * - Creating and managing parent component logic
 * - Passing data to child components via @Input()
 * - Handling child events via @Output()
 * - Parent-child communication pattern
 * 
 * Learning Goals:
 * - Understand parent-child component relationships
 * - Learn how to pass data down to children
 * - Learn how to handle events from children
 * - Master component composition
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // Parent component state
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop for developers' },
    { id: 2, name: 'Monitor', price: 299, description: '27" 4K Display' },
    { id: 3, name: 'Keyboard', price: 79, description: 'Mechanical RGB Keyboard' },
    { id: 4, name: 'Mouse', price: 49, description: 'Wireless Mouse with precision tracking' },
    { id: 5, name: 'Headphones', price: 199, description: 'Noise-cancelling headphones' }
  ];

  cart: Product[] = [];
  selectedProduct: Product | null = null;
  showDetails: boolean = false;

  // Handle child event: Add to cart
  onAddToCart(product: Product): void {
    this.cart.push(product);
    console.log(`Added to cart: ${product.name}`);
  }

  // Handle child event: View details
  onViewDetails(product: Product): void {
    this.selectedProduct = product;
    console.log(`Viewing details for: ${product.name}`);
  }

  // Handle child event: Remove product
  onRemoveProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    console.log(`Removed product with ID: ${productId}`);
  }

  // Calculate cart total
  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  // Clear cart
  clearCart(): void {
    this.cart = [];
  }
}
