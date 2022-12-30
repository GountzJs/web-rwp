import { Observable } from "rxjs";
import { ApiInterceptor } from "../../core/interceptors/ApiInterceptor";

export function EditArticleService({ slug, title, description, body }) {
  const axiosInstance = ApiInterceptor();

  const post = () => new Observable(observer => {
    axiosInstance.put(`articles/${slug}`, { article: { title, description, body }})
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return post;
}