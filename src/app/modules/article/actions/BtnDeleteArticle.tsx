import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { deleteArticleService } from "../services/deleteArticleService";

export function BtnDeleteArticle({ slug }: { slug: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();

  const actionDelete = () => {
    setLoading(true);
    deleteArticleService(slug)
      .then(() => navigate('/'))
      .catch(err => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => setLoading(false))
  }

  return (
    <button 
      type="button"
      disabled={loading}
      className="btn btn-outline-danger btn-sm"
      onClick={actionDelete}
    >
      <i className="ion-trash-a"></i> Delete Article
    </button>
  )
}