/**
 * API Models - Interfaces representing responses from the JSON server
 * These differ from domain models as they reflect the backend API structure
 */

/**
 * Generic paginated response wrapper from the API
 */
export interface APIPaginatedResponse<T> {
  content: T[]; // Array of items for current page
  page: number; // Current page number
  totalLength: number; // Total number of items
  pageSize: number; // Number of items per page
}

/**
 * Course author information from the API
 */
export interface APIAuthor {
  id: number;
  name: string;
  lastName: string;
}

/**
 * Course model as returned from the API
 * Note: Property names differ from domain Course model
 * - API uses `durationHours` instead of `duration`
 * - API uses `date` as string instead of Date object
 * - API includes `authors` array instead of single `instructor`
 * - API has `isTopRated` instead of `topRated`
 */
export interface APICourse {
  id: number;
  title: string; // Course title
  date: string; // API uses string format (will be converted to Date in domain model)
  durationHours: number; // Duration in hours
  description: string;
  authors: APIAuthor[]; // Course authors array
  isTopRated: boolean; // API uses 'isTopRated' instead of 'topRated'
  price: number; // Course price
  instructor: string; // Primary instructor name
  students: number; // Number of students enrolled
  role?: string; // User role (admin, user, etc.)
  category?: string; // Course category
}

/**
 * Authentication response from the API
 * Contains JWT token for authenticated requests
 */
export interface APIAuthResponse {
  token: string;
}

/**
 * User information from the API
 * Returned after successful authentication
 */
export interface APIUserInfo {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * Generic API error response
 */
export interface APIError {
  message: string;
  statusCode: number;
  timestamp?: string;
}
