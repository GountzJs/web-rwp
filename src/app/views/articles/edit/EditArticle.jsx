import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, NavbarUser } from "@/app/components";
import { GetArticleHook } from '@/app/hooks';
import { FormArticleEdit } from "./FormArticleEdit";

export function EditArticle() {
  const [ article, setArticle ] = useState();
  const [ errors, setErrors ] = useState([]);
  const { slug } = useParams();
  const getArticle = GetArticleHook({ slug, setArticle });

  useEffect(() => {
    getArticle();
  }, [slug])

  return (
    <>
      <NavbarUser />
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                { errors.map((err, index) => <li key={index}>{ err }</li>) }
              </ul>
              { article && <FormArticleEdit article={article} setErrors={setErrors} /> }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}