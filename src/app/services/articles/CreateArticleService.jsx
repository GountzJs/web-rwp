import { Observable } from "rxjs";
import { ApiInterceptor } from "../../core/interceptors/ApiInterceptor";

export function CreateArticleService({ title, description, body, tagList }) {
  const axiosInstance = ApiInterceptor();

  const post = () => new Observable(observer => {
    axiosInstance.post('articles', { article: { title, description, body, tagList }})
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return post;
}