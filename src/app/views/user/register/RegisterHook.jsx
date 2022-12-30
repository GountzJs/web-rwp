import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../../core/services/localStorageService";
import { RegisterService } from "../../../services/users/RegisterService";

export function RegisterHook({ form, setErrors, setDisabled }) {
  const register = RegisterService({ email: form.email, username: form.username, password: form.password });
  const navigate = useNavigate();
  const { saveToken } = LocalStorageService();

  const onSubmit = () => {
    setDisabled(true);
    register().subscribe(({ user }) => {
      saveToken(user.token);
      navigate('/');
    }, ({ data }) => {
      setErrors(data?.errors?.body || []);
    })
    .add(() => setDisabled(false))
  }

  return onSubmit;
}