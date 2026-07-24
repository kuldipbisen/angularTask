import { User, UserApiModel, AuthToken, AuthApiResponse } from '../models';

export class AuthMapper {
  static mapUserApiToDomain(apiUser: UserApiModel): User {
    return {
      id: apiUser.id,
      email: apiUser.email,
      name: apiUser.name,
      role: apiUser.role,
    };
  }

  static mapAuthApiResponseToDomain(apiResponse: AuthApiResponse): { token: AuthToken; user: User } {
    return {
      token: {
        token: apiResponse.token,
        expiresIn: apiResponse.expiresIn,
      },
      user: this.mapUserApiToDomain(apiResponse.user),
    };
  }
}
