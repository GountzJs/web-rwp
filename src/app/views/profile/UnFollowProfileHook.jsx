import { UnFollowProfileService } from "../../services/profile/UnFollowProfileService";

export function UnFollowProfileHook({ username, setFollow }) {
  const unfollow = UnFollowProfileService({ username });

  const request = () => {
    unfollow().subscribe(() => setFollow(false))
  }
  return request;
}