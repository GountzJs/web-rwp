import moment from "moment";
import { Link } from "react-router-dom";
import { IArticleSchema } from "../../shared/models/schemas/article.schema";
import { BtnFavorited } from "../actions/BtnFavorited";

interface IArticle {
  article: IArticleSchema;
  changeFavorited: (slug: string, favorited: boolean, favoritesCount: number) => void
}

export function Article({ article, changeFavorited }: IArticle) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link 
            to={`/profile/${article.author.username}`} 
            className="author"
          >
            {article.author.username}
          </Link>
          <span className="date">
            { moment(article.createdAt).format('MMMM D, YYYY') }
          </span>
        </div>
        <BtnFavorited
          slug={article.slug}
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
          changeFavorited={changeFavorited}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{ article.title }</h1>
        <p>{ article.description }</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map((tag: string, idx: number) => 
              <li key={idx} className="tag-default tag-pill tag-outline">{tag}</li>
            )
          }
        </ul>
      </Link>
    </div>
  )
}