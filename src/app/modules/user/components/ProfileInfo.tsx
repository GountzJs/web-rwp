import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../shared/redux/store";
import { BtnFollow } from "../actions/BtnFollow";
import { IProfileInfo } from "../models/interfaces/profileInfo.interface";

export function ProfileInfo({ profile, changeFollowing }: IProfileInfo) {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" />
            <h4>{ profile.username }</h4>
            <p>{ profile.bio }</p>
            {
              user.username === profile.username
                ? <Link to={'/settings'} className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </Link>
                : <BtnFollow username={profile.username} following={profile.following} changeFollowing={changeFollowing} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}