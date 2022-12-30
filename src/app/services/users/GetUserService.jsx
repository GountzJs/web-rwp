import { Observable } from "rxjs";
import { ApiInterceptor } from "@/app/core";

export function GetUserService() {
  const axiosInstance = ApiInterceptor();

  const get = () => new Observable(observer => {
    axiosInstance.get('user')
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return get;
}