import { useState } from "react";
import { ButtonForm, InputCustom, TextAreaCustom } from "@/app/components";
import { EditArticleHook } from "./EditArticleHook";

export function FormArticleEdit({ article, setErrors }) {
  const [ form, setForm ] = useState({ title: article.title, description: article.description, body: article.body });
  const [ disabled, setDisabled ] = useState(false);
  const onSubmit = EditArticleHook({ slug: article.slug, form, setDisabled, setErrors });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value }); 

  return (
    <form>
      <fieldset>
        <InputCustom type={'text'} name={'title'} disabled={disabled} placeholder={'Article Title'} value={form.title} onChange={handleInput} />
        <InputCustom type={'text'} name={'description'} disabled={disabled} placeholder={"What's this article about?"} value={form.description} onChange={handleInput} />
        <TextAreaCustom name={'body'} disabled={disabled} placeholder={'Write your article (in markdown)'} value={form.body} onChange={handleInput} />
        <div className="tag-list">
          {
            article.tagList?.map((tag, index) => <span key={index} className="tag-default tag-pill">{ tag }</span>)
          }
        </div>
        <ButtonForm name={'Publish Article'} disabled={disabled} action={onSubmit} />
      </fieldset>
    </form>
  )
}