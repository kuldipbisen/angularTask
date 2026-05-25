import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

/**
 * PRODUCT CARD COMPONENT (Child Component)
 * 
 * This is a reusable child component that demonstrates:
 * - @Input() decorator for receiving data from parent
 * - @Output() decorator for emitting events to parent
 * - Component composition and reusability
 * 
 * Learning Goals:
 * - Understand how to accept data from parent components
 * - Learn how to communicate events back to parent
 * - Build reusable, presentational components
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  // Input: Data received from parent component
  @Input() product!: Product;
  @Input() showDetails: boolean = false;

  // Output: Events emitted to parent component
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<number>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }

  onRemoveProduct(): void {
    this.removeProduct.emit(this.product.id);
  }
}
