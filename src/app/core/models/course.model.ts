// API Response Models
export interface CoursesApiResponse {
  data: CourseApiModel[];
  total: number;
  offset: number;
  count: number;
}

export interface CourseApiModel {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  instructor: string;
  rating: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Domain Models
export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  instructor: string;
  rating: number;
  imageUrl: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface CreateCourseRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
  instructor: string;
  imageUrl: string;
}

export interface UpdateCourseRequest {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  instructor?: string;
  imageUrl?: string;
}

export interface PaginationParams {
  count: number;
  offset: number;
}

export interface SearchParams extends PaginationParams {
  search?: string;
}
