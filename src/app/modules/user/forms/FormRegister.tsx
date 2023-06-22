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
import { registerService } from "../services/registerService";

export function FormRegister({ setErrors }: { setErrors: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unlogged = UnLoggedHook();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, username, password } = form;
    registerService(email, username, password)
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
      <InputDefault type="text" name="username" placeholder="Your Name" autocomplete="off" value={form.username} onChange={handleChange} />
      <InputDefault type="email" name="email" placeholder="Email" autocomplete="off" value={form.email} onChange={handleChange} />
      <InputDefault type="password" name="password" placeholder="Password" autocomplete="off" value={form.password} onChange={handleChange} />
      <button 
        type="submit"
        disabled={loading}
        className="btn btn-lg btn-primary pull-xs-right"
      >
        Sign up
      </button>
    </form>
  )
}