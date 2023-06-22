import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "../../shared/forms/InputDefault";
import { TextAreaInput } from "../../shared/forms/TextAreaInput";
import { reset } from "../../shared/redux/slices/authSlice";
import { formatError } from "../../shared/utils/formatError";
import { HandleChange } from "../../shared/utils/handleChange";
import { IFormCreateArticle } from "../models/interfaces/formCreateArticle.interface";
import { createArticleService } from "../services/createArticleService";

export function FormCreateArticle({ setErrors }: IFormCreateArticle) {
  const [form, setForm] = useState({ title: '', description: '', body: '', tags: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { title, description, body, tags } = form;
    createArticleService(title, description, body, tags.split(' ').filter(vl => vl))
      .then((res) => {
        navigate(`/article/${res.article.slug}`)
      })
      .catch(err => {
        if(err?.message === 'missing authorization credentials') {
          sessionStorage.clear();
          dispatch(reset());
          navigate('/login');
        } else {
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
        <InputDefault type="text" name="tags" placeholder="Enter tags" value={form.tags} onChange={handleChange} />
        <div className="tag-list">
          { 
            form.tags.split(' ').filter(vl => vl).map((tag: string, index: number) => 
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