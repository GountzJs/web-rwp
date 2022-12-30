import { Observable } from "rxjs";
import { ApiInterceptor } from "../../core/interceptors/ApiInterceptor";

export function GetArticleService({ slug }) {
  const axiosInstance = ApiInterceptor();

  const get = () => new Observable(observer => {
    axiosInstance.get(`articles/${slug}`)
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return get;
}