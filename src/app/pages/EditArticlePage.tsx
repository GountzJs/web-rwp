import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormEditArticle } from "../modules/article/forms/FormEditArticle";
import { getArticleService } from "../modules/article/services/getArticleService";
import { UnLoggedHook } from "../modules/shared/hooks/UnLoggedHook";
import { IArticleSchema } from "../modules/shared/models/schemas/article.schema";

export function EditArticlePage() {
  const [article, setArticle] = useState<IArticleSchema>();
  const [errors, setErrors] = useState<string[]>([]);
  const { slug } = useParams();
  const unlogged = UnLoggedHook();

  useEffect(() => {
    document.title = 'Editor — Conduit'
  }, [])

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
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <ul className="error-messages">
              { errors.map((error, idx) => <li key={idx}>{error}</li>) }
            </ul>

            { article && <FormEditArticle article={article} setErrors={setErrors} /> }

          </div>
        </div>
      </div>
    </div>
  )
}