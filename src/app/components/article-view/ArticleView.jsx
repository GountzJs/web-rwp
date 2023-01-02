export function ArticleView({ article }) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
        <div className="info">
          <a href="" className="author">{ article.username }</a>
          <span className="date">{ article.createdAt }</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> { article.favoritesCount }
        </button>
      </div>
      <a href="" className="preview-link">
        <h1>{ article.title }</h1>
        <p>{ article.description }</p>
        <span>Read more...</span> 
      </a>
    </div>
  )
}