import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { InputDefault } from "../../shared/forms/InputDefault";
import { TextAreaInput } from "../../shared/forms/TextAreaInput";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { getUsername } from "../../shared/redux/slices/userSlice";
import { authenticationService } from "../../shared/services/authenticationService";
import { formatError } from "../../shared/utils/formatError";
import { HandleChange } from "../../shared/utils/handleChange";
import { IFormSettings } from "../models/interfaces/formSettings.interface";
import { editUserService } from "../services/editUserService";


export function FormSettings({ user, setErrors }: IFormSettings) {
  const initialValues = { image: user.image, bio: user.bio ?? '', username: user.username, email: user.email, password: '' }
  const [form, setForm] = useState(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = HandleChange({ form, setForm });
  const dispatch = useDispatch();
  const unlogged = UnLoggedHook();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { image, bio, username, email, password } = form;
    editUserService(image, bio, username, email, password)
      .then((res) => {
        dispatch(getUsername({ username, image }));
        authenticationService(res.user);
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
      <fieldset>
        <InputDefault type="text" name="image" placeholder="URL of profile picture" value={form.image} onChange={handleChange} />
        <InputDefault type="username" name="username" placeholder="Your Name" value={form.username} onChange={handleChange} />
        <TextAreaInput name="bio" rows={8} placeholder="Short bio about you" value={form.bio} onChange={handleChange} />
        <InputDefault type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <InputDefault type="password" name="password" autocomplete="current-password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-lg btn-primary pull-xs-right"
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  )
}