import { FollowProfileService } from "../../services/profile/FollowProfileService";

export function FollowProfileHook({ username, setFollow }) {
  const post = FollowProfileService({ username });

  const request = () => {
    post().subscribe(() => setFollow(true))
  }
  return request;
}