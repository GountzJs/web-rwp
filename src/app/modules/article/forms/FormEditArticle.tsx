import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "../../shared/forms/InputDefault";
import { TextAreaInput } from "../../shared/forms/TextAreaInput";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { formatError } from "../../shared/utils/formatError";
import { HandleChange } from "../../shared/utils/handleChange";
import { IFormEditArticle } from "../models/interfaces/formEditArticle.interface";
import { editArticleService } from "../services/editArticleService";

export function FormEditArticle({ article, setErrors }: IFormEditArticle) {
  const initialValues = { title: article.title, description: article.description, body: article.body }
  const [form, setForm] = useState(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { title, description, body} = form;
    editArticleService(article.slug, title, description, body)
      .then((res) => navigate(`/article/${res.article.slug}`))
      .catch(err => {
        if(err?.message === 'missing authorization credentials') unlogged();
        else {
          const errors = err?.errors ?? {};
          const list = formatError(errors);
          setErrors(list);
        }
      })
      .finally(() => setLoading(false))
  } 

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <InputDefault type="text" name="title" placeholder="Article Title" value={form.title} onChange={handleChange} />
        <InputDefault type="text" name="description" placeholder="What's this article about?" value={form.description} onChange={handleChange} />
        <TextAreaInput name="body" rows={8} placeholder="Write your article (in markdown)" value={form.body} onChange={handleChange} />
        <div className="tag-list">
          {
            article.tagList.map((tag: string, index: number) =>
              <span key={index} className="tag-default tag-pill">{tag}</span>
            )
          }
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="btn btn-lg pull-xs-right btn-primary"
        >
          Publish Article
        </button>
      </fieldset>
    </form>
  )
}