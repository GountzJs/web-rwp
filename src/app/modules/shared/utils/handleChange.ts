import { ChangeEvent } from 'react';

export function HandleChange({ form, setForm }: any) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  return handleChange;
}
