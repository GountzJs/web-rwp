import { Observable } from 'rxjs';
import { ApiInterceptor } from "../../core/interceptors/ApiInterceptor";

export function FollowProfileService({ username }) {
  const axiosInstance = ApiInterceptor();

  const post = () => new Observable(observer => {
    axiosInstance.post(`profiles/${username}/follow`)
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return post;
}