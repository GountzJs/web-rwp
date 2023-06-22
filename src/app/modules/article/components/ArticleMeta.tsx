import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IArticleSchema } from "../../shared/models/schemas/article.schema";
import { RootState } from "../../shared/redux/store";
import { BtnFollow } from "../../user/actions/BtnFollow";
import { BtnDeleteArticle } from "../actions/BtnDeleteArticle";
import { BtnDetailFavorited } from "../actions/BtnDetailFavorited";

interface IArticleMeta {
  article: IArticleSchema,
  setArticle: React.Dispatch<React.SetStateAction<IArticleSchema | undefined>>
}

export function ArticleMeta({ article, setArticle }: IArticleMeta) {
  const user = useSelector((state: RootState) => state.user.value);
  const isLogin = useSelector((state: RootState) => state.auth.value);

  const changeFollowing = (following: boolean) => setArticle({ ...article, author: { ...article.author, following } });

  const changeFavorite = (favorited: boolean, favoritesCount: number) => setArticle({ ...article, favorited, favoritesCount });

  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}><img src={ article.author.image } /></Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">{ article.author.username }</Link>
        <span className="date">{ moment(article.createdAt).format('MMMM D, YYYY') }</span>
      </div>
      {
        (isLogin && user?.username === article.author.username)
          ? <Link to={`/editor/${article.slug}`} className="btn btn-outline-secondary btn-sm">
              <i className="ion-edit"></i> Edit Article
            </Link>
          : <BtnFollow
              username={article.author.username}
              following={article.author.following}
              changeFollowing={changeFollowing}
            />
      }
      &nbsp;&nbsp;
      {
        (isLogin && user?.username === article.author.username)
          ? <BtnDeleteArticle slug={article.slug} />
          : <BtnDetailFavorited
              slug={article.slug}
              favoritesCount={article.favoritesCount}
              favorited={article.favorited}
              changeFavorited={changeFavorite}
            />
      }
    </div>
  )
}