import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleMeta } from "../modules/article/components/ArticleMeta";
import { getArticleService } from "../modules/article/services/getArticleService";
import { ListComments } from "../modules/comment/components/ListComments";
import { UnLoggedHook } from "../modules/shared/hooks/UnLoggedHook";
import { IArticleSchema } from "../modules/shared/models/schemas/article.schema";

export function DetailArticlePage() {
  const [article, setArticle] = useState<IArticleSchema>();
  const { slug } = useParams();
  const unlogged = UnLoggedHook();

  useEffect(() => {
    if(slug) {
      getArticleService(slug)
        .then(res => setArticle(res.article))
        .catch((err) => {
          if(err?.message === 'missing authorization credentials') unlogged();
        })
    }
  }, [slug])

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          { article && <h1>{article.title}</h1> }
    
          { article && <ArticleMeta article={article} setArticle={setArticle} /> }

        </div>
      </div>
    
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            { article && <p>{article.body}</p> }
          </div>
        </div>

        <hr />

        <div className="article-actions">
          { article && <ArticleMeta article={article} setArticle={setArticle} /> }
        </div>
        <div className="row">
          { article && <ListComments slug={article.slug} /> }
        </div>
      </div>
    </div>  
  )
}