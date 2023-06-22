import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { RootState } from "../../shared/redux/store";
import { IBtnFollow } from "../models/interfaces/btnFollow.interface";
import { followProfileService } from "../services/followProfileService";
import { unfollowProfileService } from "../services/unfollowProfileService";

export function BtnFollow({ username, following, changeFollowing }: IBtnFollow) {
  const [loading, setLoading] = useState<boolean>();
  const isLogin = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();
  
  const actionFollow = () => {
    if(!isLogin) return navigate('/login');
    setLoading(true);
    following
      ? unfollow()
      : follow();
  }

  const follow = () => {
    followProfileService(username)
      .then(() => changeFollowing(true))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false))
  }

  const unfollow = () => {
    unfollowProfileService(username)
      .then(() => changeFollowing(false))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false))
  }

  return (
    <button 
      type="button" 
      disabled={loading}
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={actionFollow}
    >
      <i className={`ion-plus-round`}></i>
      &nbsp; { following ? 'Unfollow' : 'Follow' } { username }
    </button>
  )
}