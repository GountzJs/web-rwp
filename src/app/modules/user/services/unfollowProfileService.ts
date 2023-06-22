import { httpClient } from '../../shared/http/httpClient';
import { IProfileSchema } from '../../shared/models/schemas/profile.schema';

export function unfollowProfileService(
  username: string
): Promise<{ profile: IProfileSchema }> {
  return httpClient<{ profile: IProfileSchema }>(
    `profiles/${username}/follow`,
    'DELETE'
  );
}
