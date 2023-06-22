import { ChangeEvent } from 'react';

export interface ITextAreaInput {
  name: string;
  placeholder: string;
  rows: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
