import { FormEvent, useState } from "react";
import { TextAreaInput } from "../../shared/forms/TextAreaInput";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { HandleChange } from "../../shared/utils/handleChange";
import { IFormComment } from "../models/interfaces/formComment.interface";
import { createCommentService } from "../services/createCommentService";

export function FormComment({ slug, addComment, image }: IFormComment) {
  const [form, setForm] = useState({ body: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const unlogged = UnLoggedHook();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    createCommentService(slug, form.body)
      .then(res => {
        setForm({ body: '' });
        addComment(res.comment);
      })
      .catch(err => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false))
  }

  return (
    <form className="card comment-form" onSubmit={onSubmit}>
      <div className="card-block">
        <TextAreaInput name="body" placeholder="Write a comment..." value={form.body} rows={3} onChange={handleChange} />
      </div>
      <div className="card-footer">
        <img src={image} className="comment-author-img" />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm btn-primary"
        >
          Post Comment
        </button>
      </div>
    </form> 
  )
}