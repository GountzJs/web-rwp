import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "../../shared/forms/InputDefault";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { reset } from "../../shared/redux/slices/authSlice";
import { getUsername } from "../../shared/redux/slices/userSlice";
import { authenticationService } from "../../shared/services/authenticationService";
import { formatError } from "../../shared/utils/formatError";
import { HandleChange } from "../../shared/utils/handleChange";
import { loginService } from "../services/loginService";

export function FormLogin({ setErrors }: { setErrors: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = form;
    loginService(email, password)
      .then((res) => {
        const { user } = res;
        dispatch(getUsername({ username: user.username, image: user.image }));
        authenticationService(user);
        navigate('/');
        dispatch(reset());
      })
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
        else {
          const errors = err?.errors ?? {};
          const list = formatError(errors);
          setErrors(list);
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      <InputDefault type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <InputDefault
        type="password"
        name="password"
        autocomplete="current-password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button 
        type="submit"
        disabled={loading}
        className="btn btn-lg btn-primary pull-xs-right"
      >
        Sign in
      </button>
    </form>
  )
}