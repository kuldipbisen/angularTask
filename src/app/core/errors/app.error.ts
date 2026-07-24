export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND_ERROR', 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 'CONFLICT_ERROR', 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 'SERVER_ERROR', 500);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error') {
    super(message, 'NETWORK_ERROR', 0);
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ErrorHandler {
  static handle(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof ErrorEvent) {
      return new NetworkError(error.message);
    }

    if (error instanceof ProgressEvent) {
      return new NetworkError('Network request failed');
    }

    if (typeof error === 'object' && error !== null && 'error' in error) {
      const err = error as Record<string, unknown>;
      const errorMsg = err['error'];
      if (typeof errorMsg === 'string') {
        return new ServerError(errorMsg);
      }
    }

    if (typeof error === 'string') {
      return new AppError(error);
    }

    return new AppError('An unexpected error occurred');
  }

  static toApiError(error: AppError): ApiErrorResponse {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }
}
