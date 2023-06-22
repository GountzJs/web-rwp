import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { NavArticlesProfile } from "../../modules/article/components/NavArticlesProfile";
import { UnLoggedHook } from "../../modules/shared/hooks/UnLoggedHook";
import { IProfileSchema } from "../../modules/shared/models/schemas/profile.schema";
import { ProfileInfo } from "../../modules/user/components/ProfileInfo";
import { getProfileService } from "../../modules/user/services/getProfileService";

export function ProfilePage() {
  const [profile, setProfile] = useState<IProfileSchema>();
  const { username } = useParams();
  const unlogged = UnLoggedHook();

  useEffect(() => {
    if(username) {
      document.title = `${username} — Conduit`;
      getProfileService(username)
        .then(res => setProfile(res.profile))
        .catch((err) => {
          if(err?.message === 'missing authorization credentials') unlogged();
        })
    }
  }, [username])

  const changeFollowing = (following: boolean) => {
    setProfile({ ...profile, following });
  }

  return (
    <div className="profile-page">
      { profile && <ProfileInfo profile={profile} changeFollowing={changeFollowing} /> }

      <div className="container">
        <div className="row">
          
          <div className="col-xs-12 col-md-10 offset-md-1">

            <NavArticlesProfile />

            <Outlet />

          </div>
        </div>
      </div>
    </div>
  )
}