import { httpClient } from '../../shared/http/httpClient';
import { IUserSchema } from '../../shared/models/schemas/user.schema';

export function registerService(
  email: string,
  username: string,
  password: string
): Promise<{ user: IUserSchema }> {
  return httpClient<{ user: IUserSchema }>(`users`, 'POST', {
    user: { email, username, password },
  });
}
