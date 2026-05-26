export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  rating: number; // 0-5
}
