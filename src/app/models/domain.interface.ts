/**
 * Domain Models - Interfaces representing data used within the application
 * These are transformed from API models and may have different structures/names
 */

/**
 * Domain Course model - represents a course within the application
 * Transformed from APICourse which has different property names
 */
export interface Course {
  id: string; // Converted to string for consistency in domain
  title: string; // Transformed from API's 'name'
  description: string;
  instructor: string; // Transformed from API's 'authors' array (primary instructor name)
  duration: number; // Transformed from API's 'length'
  price: number; // Course price
  students: number; // Number of students enrolled
  createdAt: Date; // Transformed from API's 'date' string
  topRated?: boolean; // Transformed from API's 'isTopRated'
  authors?: DomainAuthor[]; // Optional: full authors array
  role?: string; // User role (admin, user, etc.)
  category?: string; // Course category
}

/**
 * Domain Author model
 */
export interface DomainAuthor {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
}

/**
 * Domain User model
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Domain Auth state
 */
export interface AuthState {
  token: string;
  user: User;
  isAuthenticated: boolean;
}

/**
 * Paginated response for domain models
 */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
