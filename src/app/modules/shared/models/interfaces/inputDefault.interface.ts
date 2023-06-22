import { ChangeEvent } from 'react';

export interface IInputDefault {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  autocomplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
