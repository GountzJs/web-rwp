import { Observable } from 'rxjs';
import { ApiInterceptor } from "@/app/core";

export function UnFollowProfileService({ username }) {
  const axiosInstance = ApiInterceptor();

  const unfollow = () => new Observable(observer => {
    axiosInstance.delete(`profiles/${username}/follow`)
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return unfollow;
}