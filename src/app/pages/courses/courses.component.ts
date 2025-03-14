import { Component } from "@angular/core";

export interface Course {
  id: string;
  title: string;
  created: string;
  duration: number;
  description: string;
}

@Component({
    "selector": "app-courses",
    "imports": [],
    "templateUrl": "./courses.component.html",
    "styleUrl": "./courses.component.scss"
})
export class CoursesComponent {

}
