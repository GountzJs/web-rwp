import { useNavigate } from "react-router-dom";
import { EditArticleService } from "../../../services/articles/EditArticleService";

export function EditArticleHook({ slug, form, setDisabled, setErrors }) {
  const navigate = useNavigate();
  const put = EditArticleService({
    slug,
    title: form.title, 
    body: form.body, 
    description: form.description, 
  });

  const onSubmit = () => {
    setErrors([]);
    setDisabled(true);
    put().subscribe(({ article }) => {
      navigate(`/editor/${article.slug}`)
    }, ({ data }) => setErrors(data?.errors?.body || []))
    .add(() => setDisabled(false));
  }

  return onSubmit;
}