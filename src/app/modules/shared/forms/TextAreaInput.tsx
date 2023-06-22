import { ITextAreaInput } from "../models/interfaces/textAreaInput.interface";

export function TextAreaInput({ name, placeholder, rows, value, onChange }: ITextAreaInput) {
  return (
    <fieldset className="form-group">
      <textarea
        name={name}
        className="form-control form-control-lg"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </fieldset>
  )
}