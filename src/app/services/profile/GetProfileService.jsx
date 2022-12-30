import { Observable } from 'rxjs';
import { ApiInterceptor } from "@/app/core";

export function GetProfileService({ username }) {
  const axiosInstance = ApiInterceptor();

  const get = () => new Observable(observer => {
    axiosInstance.get(`profiles/${username}`)
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return get;
}