import { useNavigate } from "react-router-dom";
import { EditUserService } from "../../../services/users/EditUserService";

export function EditUserHook({ form, setErrors , setDisabled}) {
  const put = EditUserService({ image: form.image, username: form.username, bio: form.bio, email: form.email, password: form.password });
  const navigate = useNavigate();

  const onSubmit = () => {
    setDisabled(true);
    put().subscribe(() => navigate('/'), ({ data }) => {
      setErrors(data?.errors?.body || [])
    }).add(() => setDisabled(false));
  }

  return onSubmit;
}