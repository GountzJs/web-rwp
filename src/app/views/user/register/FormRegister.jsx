import { useState } from "react";
import { ButtonForm, InputCustom } from "@/app/components";
import { RegisterHook } from "./RegisterHook";

export function FormRegister({ setErrors }) {
  const [ form, setForm ] = useState({ email: '', username: '', password: '' });
  const [ disabled, setDisabled ] = useState(false);
  const onSubmit = RegisterHook({ form, setErrors, setDisabled });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form>
      <InputCustom type={'text'} name={'username'} disabled={disabled} placeholder={'Your Name'} value={form.username} onChange={handleInput} />
      <InputCustom type={'email'} name={'email'} disabled={disabled} placeholder={'Email'} value={form.email} onChange={handleInput} />
      <InputCustom type={'password'} name={'password'} disabled={disabled} placeholder={'Password'} value={form.password} onChange={handleInput} />
      <ButtonForm name={'Sign up'} disabled={disabled} action={onSubmit} />
    </form>
  )
}