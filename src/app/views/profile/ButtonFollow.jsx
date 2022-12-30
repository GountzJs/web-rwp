import { FollowProfileHook } from "./FollowProfileHook";
import { UnFollowProfileHook } from "./UnFollowProfileHook";

export function ButtonFollow({ username, following, setFollow }) {
  const follow = FollowProfileHook({ username, setFollow });
  const unfollow = UnFollowProfileHook({ username, setFollow })

  const changeFollow = () => following ? unfollow() : follow();

  return (
    <button type="button" className="btn btn-sm btn-outline-secondary action-btn" onClick={changeFollow}>
      <i className="ion-plus-round"></i>
      &nbsp; { following ? 'Unfollow': 'Follow' } { username }
    </button>
  )
}