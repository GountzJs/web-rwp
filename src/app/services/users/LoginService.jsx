import { Observable } from "rxjs";
import { ApiInterceptor } from "@/app/core";

export function LoginService({ email, password }) {
  const axiosInstance = ApiInterceptor();

  const login = () => new Observable(observer => {
    axiosInstance.post('users/login', { user: { email, password } })
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return login;
}