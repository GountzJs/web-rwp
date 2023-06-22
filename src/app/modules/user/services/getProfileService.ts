import { httpClient } from '../../shared/http/httpClient';
import { IProfileSchema } from '../../shared/models/schemas/profile.schema';

export function getProfileService(
  username: string
): Promise<{ profile: IProfileSchema }> {
  return httpClient<{ profile: IProfileSchema }>(`profiles/${username}`, 'GET');
}
