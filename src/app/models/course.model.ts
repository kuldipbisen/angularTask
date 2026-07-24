export interface Course {
  id: number;
  name: string;
  instructor: string;
  duration: number; // in minutes
  rating: number; // 0-5
  isNew: boolean;
  createdDate: Date;
  price: number;
  isFeatured: boolean;
  topRated: boolean;
}
