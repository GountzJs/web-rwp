import { useState } from "react";
import { InputCustom, ButtonForm } from "@/app/components";
import { LoginHook } from "./LoginHook";

export function FormLogin({ setErrors }) {
  const [ form, setForm ] = useState({ email: '', password: '' });
  const [ disabled, setDisabled ] = useState(false);
  const onSubmit = LoginHook({ form, setErrors, setDisabled });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form>
      <InputCustom type={'email'} name={'email'} disabled={disabled} placeholder={'Email'} value={form.email} onChange={handleInput} />
      <InputCustom type={'password'} name={'password'} disabled={disabled} placeholder={'Password'} value={form.password} onChange={handleInput} />
      <ButtonForm name={'Sign in'} disabled={disabled} action={onSubmit} />
    </form>
  )
}