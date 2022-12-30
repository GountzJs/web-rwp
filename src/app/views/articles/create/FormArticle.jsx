import { useState } from "react";
import { TextAreaCustom, InputCustom, ButtonForm } from "@/app/components";
import { CreateArticleHook } from "./CreateArticleHook";

export function FormArticle({ setErrors }) {
  const [ form, setForm ] = useState({ title: '', description: '', body: '', tags: '' });
  const [ disabled, setDisabled ] = useState(false);
  const onSubmit = CreateArticleHook({ form, setForm, setDisabled, setErrors });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value }); 

  return (
    <form>
      <fieldset>
        <InputCustom type={'text'} name={'title'} disabled={disabled} placeholder={'Article Title'} value={form.title} onChange={handleInput} />
        <InputCustom type={'text'} name={'description'} disabled={disabled} placeholder={"What's this article about?"} value={form.description} onChange={handleInput} />
        <TextAreaCustom name={'body'} disabled={disabled} placeholder={'Write your article (in markdown)'} value={form.body} onChange={handleInput} />
        <fieldset className="form-group">
          <input type="text" name="tags" disabled={disabled} className="form-control" placeholder="Enter tags" onChange={handleInput} />
          <div className="tag-list">
            {
              form.tags?.split(' ').filter(vl => vl !== '').map((tag, index) => <span key={index} className="tag-default tag-pill">{ tag }</span>)
            }
          </div>
        </fieldset>
        <ButtonForm name={'Publish Article'} disabled={disabled} action={onSubmit} />
      </fieldset>
    </form>
  )
}