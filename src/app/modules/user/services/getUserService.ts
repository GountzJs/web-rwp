import { httpClient } from '../../shared/http/httpClient';
import { IUserSchema } from '../../shared/models/schemas/user.schema';

export function getUserService(): Promise<{ user: IUserSchema }> {
  return httpClient<{ user: IUserSchema }>('user', 'GET');
}
