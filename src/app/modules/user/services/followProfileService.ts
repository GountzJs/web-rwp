import { httpClient } from '../../shared/http/httpClient';
import { IProfileSchema } from '../../shared/models/schemas/profile.schema';

export function followProfileService(
  username: string
): Promise<{ profile: IProfileSchema }> {
  return httpClient<{ profile: IProfileSchema }>(
    `profiles/${username}/follow`,
    'POST',
    {}
  );
}
