import { httpClient } from '../../shared/http/httpClient';
import { IUserSchema } from '../../shared/models/schemas/user.schema';

export function loginService(
  email: string,
  password: string
): Promise<{ user: IUserSchema }> {
  return httpClient<{ user: IUserSchema }>(`users/login`, 'POST', {
    user: { email, password },
  });
}
