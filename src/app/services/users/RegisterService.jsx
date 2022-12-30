import { Observable } from "rxjs";
import { ApiInterceptor } from "../../core/interceptors/ApiInterceptor";

export function RegisterService({ email, username, password }) {
  const axiosInstance = ApiInterceptor();

  const register = () => new Observable(observer => {
    axiosInstance.post('users', { user: { email, username, password } })
      .then(response => response)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });

  return register;
}