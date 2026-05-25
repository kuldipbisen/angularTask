import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LearningModulesComponent } from './components/learning-modules.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LearningModulesComponent],
  template: `<app-learning-modules></app-learning-modules>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'agmp-tests';
}
