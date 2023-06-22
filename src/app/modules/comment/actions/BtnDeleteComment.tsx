import { useState } from "react";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { IBtnDeleteComment } from "../models/interfaces/btnDeleteComment";
import { deleteCommentService } from "../services/deleteCommentService";

export function BtnDeleteComment({ slug, id, removeComment }: IBtnDeleteComment) {
  const [loading, setLoading] = useState<boolean>(false);
  const unlogged = UnLoggedHook();

  const actionDelete = () => {
    setLoading(true);
    deleteCommentService(slug, id)
      .then(() => removeComment(id))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false))
  }

  return (
    <button type="button" disabled={loading} className="btn mod-options" onClick={actionDelete}>
      <i className="ion-trash-a"></i>
    </button>  
  )
}