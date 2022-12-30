import { useNavigate } from 'react-router-dom';
import { GetArticleService } from '../services/articles/GetArticleService';

export function GetArticleHook({ slug, setArticle }) {
  const get = GetArticleService({ slug });
  const navigate = useNavigate();

  const getArticle = () => {
    get().subscribe(({ article }) => {
      setArticle(article);
    }, () => navigate('/'))
  };

  return getArticle;
}