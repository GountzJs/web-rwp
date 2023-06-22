import { httpClient } from '../../shared/http/httpClient';
import { IUserSchema } from '../../shared/models/schemas/user.schema';

export function editUserService(
  image: string,
  bio: string,
  username: string,
  email: string,
  password: string
): Promise<{ user: IUserSchema }> {
  return httpClient<{ user: IUserSchema }>('user', 'PUT', {
    user: { image, bio, username, email, password },
  });
}
