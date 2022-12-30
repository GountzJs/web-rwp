import { Observable } from "rxjs";
import { ApiInterceptor } from "@/app/core";

export function EditUserService({ image, username, bio, email, password }) {
  const axiosInstance = ApiInterceptor();

  const put = () => new Observable(observer => {
    axiosInstance.put('user', { user: { image, username, bio, email, password }})
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return put;
}