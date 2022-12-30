import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../../components/layouts/footer/Footer";
import { Navbar } from "../../components/layouts/header/Navbar";
import { NavbarUser } from "../../components/layouts/header/NavbarUser";
import { LocalStorageService } from "../../core/services/LocalStorageService";
import { ButtonFollow } from "./ButtonFollow";
import { GetProfileHook } from "./GetProfileHook";

export function Profile() {
  const [ profile, setProfile ] = useState();
  const [ user, setUser ] = useState();
  const { isLogin } = LocalStorageService();
  const { username } = useParams();
  const { getUser } = LocalStorageService();
  const response = GetProfileHook({ username, setProfile });

  useEffect(() => {
    const data = JSON.parse(getUser());
    if(data) setUser(data.user);
  }, [])

  useEffect(() => {
    if(username) response();
  }, [username])

  const changeFollowing = (follow) => setProfile({...profile, following: follow }); 

  return (
    <>
      {
        isLogin()
          ? <NavbarUser />
          : <Navbar />
      }
      <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={ profile?.image } className="user-img" />
                  <h4>{ profile?.username }</h4>
                  <p> { profile?.bio } </p>
                  { 
                    user?.username === profile?.username
                    ? <Link to={'/settings'} className="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-gear-a"></i> Settings
                      </Link>
                    : <ButtonFollow username={ profile?.username } following={ profile?.following } setFollow={changeFollowing} />
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link active" href="">My Articles</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">Favorited Articles</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer />
    </>
  )
}