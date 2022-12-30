import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "@/app/core";
import { LoginService } from "@/app/services";

export function LoginHook({ form, setErrors, setDisabled }) {
  const login = LoginService({ email: form.email, password: form.password });
  const navigate = useNavigate();
  const { saveToken } = LocalStorageService();

  const onSubmit = () => {
    setDisabled(true);
    login().subscribe( 
      ({ user }) => {
        saveToken(user.token);
        navigate('/');
      }, 
      ({ data }) => {
        setErrors(data?.errors?.body || [])
      })
      .add(() => setDisabled(false))
  }

  return onSubmit;
}