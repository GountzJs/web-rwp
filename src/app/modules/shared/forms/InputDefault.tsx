import { IInputDefault } from "../models/interfaces/inputDefault.interface";

export function InputDefault({ type, name, placeholder, value, autocomplete = 'on', onChange }: IInputDefault) {
  return (
    <fieldset className="form-group">
      <input
        type={type} 
        name={name}
        className="form-control form-control-lg"
        value={value}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onChange={onChange}
      />
    </fieldset>
  )
}