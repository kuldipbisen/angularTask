import { Component, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  username: string;
  email: string;
  message: string;
}

/**
 * TEMPLATE REFERENCE VARIABLES DEMO
 * 
 * This component demonstrates:
 * - Using #template references to access DOM elements
 * - @ViewChild() to get single element reference
 * - @ViewChildren() to get multiple element references
 * - Direct DOM manipulation through template references
 * - Accessing form values through references
 * 
 * Learning Goals:
 * - Understand template reference variables syntax (#variableName)
 * - Learn how to use ViewChild and ViewChildren
 * - Access DOM elements directly when needed
 * - Manage form inputs without two-way binding
 * - Understand when to use references vs. data binding
 */
@Component({
  selector: 'app-template-reference-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-reference-demo.component.html',
  styleUrls: ['./template-reference-demo.component.scss']
})
export class TemplateReferenceComponent {
  @ViewChild('usernameInput') usernameInputRef?: ElementRef;
  @ViewChildren('textInputs') textInputRefs?: QueryList<ElementRef>;

  capturedUsername: string = '';
  allInputValues: string[] = [];
  formData: FormData | null = null;

  private colorIndex = 0;
  private colors = ['#e1bee7', '#f8bbd0', '#ffe0b2', '#c8e6c9', '#b3e5fc'];

  /**
   * Capture single input value using template reference
   */
  captureUsername(input: HTMLInputElement): void {
    this.capturedUsername = input.value;
    console.log('Captured username:', input.value);
  }

  /**
   * Capture multiple input values using @ViewChildren
   */
  captureAllInputs(): void {
    this.allInputValues = [];
    if (this.textInputRefs) {
      this.textInputRefs.forEach((inputRef, index) => {
        const value = inputRef.nativeElement.value;
        this.allInputValues.push(`Input ${index + 1}: ${value || '(empty)'}`);
      });
    }
  }

  /**
   * Capture form data using template references
   */
  captureFormData(
    username: HTMLInputElement, 
    email: HTMLInputElement, 
    message: HTMLTextAreaElement
  ): void {
    this.formData = {
      username: username.value,
      email: email.value,
      message: message.value
    };
    console.log('Form data:', this.formData);
  }

  /**
   * Reset form using template reference
   */
  resetForm(form: HTMLFormElement): void {
    form.reset();
    this.formData = null;
  }

  /**
   * Change box color using template reference
   */
  changeBoxColor(box: HTMLDivElement): void {
    box.style.backgroundColor = this.colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
  }

  /**
   * Reset box to original color
   */
  resetBoxColor(box: HTMLDivElement): void {
    box.style.backgroundColor = '#e1bee7';
    this.colorIndex = 0;
  }
}
