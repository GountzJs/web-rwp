import { useEffect, useState } from 'react';
import { ButtonForm, InputCustom, TextAreaCustom  } from '@/app/components';
import { GetUserHook } from '@/app/hooks';
import { EditUserHook } from './EditUserHook';

export function FormSettings({ setErrors }) {
  const [ user, setUser ] = useState();
  const [ form, setForm ] = useState({ image: '', username: '', bio: '', email: '', password: '' });
  const [ disabled, setDisabled ] = useState(false);
  const getUser = GetUserHook({ setUser });
  const onSubmit = EditUserHook({ form, setErrors, setDisabled })

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    setForm({ image: user?.image ?? '', username: user?.username ?? '', bio: user?.bio ?? '', email: user?.email ?? '', password: '' })
  }, [user])

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form>
      <fieldset>
        <InputCustom type={'text'} name={'image'} disabled={disabled} placeholder={'URL of profile picture'} value={form.image} onChange={handleInput} />
        <InputCustom type={'text'} name={'username'} disabled={disabled} placeholder={'Your Name'} value={form.username} onChange={handleInput} />
        <TextAreaCustom name={'bio'} disabled={disabled} placeholder={'Short bio about you'} value={form.bio} onChange={handleInput} />
        <InputCustom type={'email'} name={'email'} disabled={disabled} placeholder={'Email'} value={form.email} onChange={handleInput} />
        <InputCustom type={'password'} name={'password'} disabled={disabled} placeholder={'Password'} value={form.password} onChange={handleInput} />
        <ButtonForm name={'Update Settings'} disabled={disabled} action={onSubmit} />
      </fieldset>
    </form>
  )
}