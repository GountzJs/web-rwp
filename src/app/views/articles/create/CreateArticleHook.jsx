import { CreateArticleService } from "@/app/services";

export function CreateArticleHook({ form, setForm, setDisabled, setErrors }) {
  const post = CreateArticleService({ 
    title: form.title, 
    body: form.body, 
    description: form.description, 
    tagList: form.tags.split(' ').filter(vl => vl !== '') ?? []
  });

  const onSubmit = () => {
    setDisabled(true);
    post().subscribe(() => {
      setForm({ title: '', description: '', body: '', tags: '' });
    }, ({ data }) => setErrors(data?.errors?.body || []))
    .add(() => setDisabled(false));
  }

  return onSubmit;
}