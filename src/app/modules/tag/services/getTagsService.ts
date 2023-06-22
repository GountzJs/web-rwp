import { httpClient } from '../../shared/http/httpClient';
import { ITags } from '../../shared/models/schemas/tags.schema';

export function getTagsService(): Promise<ITags> {
  return httpClient<ITags>('tags', 'GET');
}
