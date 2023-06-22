import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { RootState } from "../../shared/redux/store";
import { IBtnFavorited } from "../models/interfaces/btnFavorited.interface";
import { favoriteArticleService } from "../services/favoriteArticleService";
import { unfavoriteArticleService } from "../services/unfavoriteArticleService";

export function BtnFavorited({ slug, favoritesCount, favorited, changeFavorited }: IBtnFavorited) {
  const isLogin = useSelector((state: RootState) => state.auth.value);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();

  const actionChangeFavorited = () => {
    if(!isLogin) return navigate('/login');
    favorited ? actionUnfavorited() : actionFavorited();
  }

  const actionFavorited = () => {
    setLoading(true);
    favoriteArticleService(slug)
      .then((res) => changeFavorited(slug, res.article.favorited, res.article.favoritesCount))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false));
  }

  const actionUnfavorited = () => {
    setLoading(true);
    unfavoriteArticleService(slug)
      .then((res) => changeFavorited(slug, res.article.favorited, res.article.favoritesCount))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false));
  }

  return (
    <button 
      type="button"
      disabled={loading}
      className={`btn ${favorited ? 'btn-primary': 'btn-outline-primary' } btn-sm pull-xs-right`}
      onClick={actionChangeFavorited}
    >
      <i className="ion-heart"></i> { favoritesCount }
    </button>  
  )
}