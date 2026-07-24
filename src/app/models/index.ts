/**
 * Models barrel export
 * Centralized exports for all API and domain models
 */

// API Models
export type {
  APIPaginatedResponse,
  APICourse,
  APIAuthor,
  APIAuthResponse,
  APIUserInfo,
  APIError
} from './api.interface';

// Domain Models
export type {
  Course,
  DomainAuthor,
  User,
  AuthState,
  PaginatedResponse
} from './domain.interface';

// Mappers
export {
  mapAPIAuthorToDomain,
  mapAPICourseToDomain,
  mapAPICoursesToDomain,
  mapAPIPaginatedResponseToDomain,
  mapAPIPaginatedCoursesToDomain
} from './mappers';
