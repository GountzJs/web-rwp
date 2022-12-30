export function InputCustom({ type, name, placeholder, value, disabled, onChange }) {
  return (
    <fieldset className="form-group">
      <input type={type} name={name} disabled={disabled} className="form-control form-control-lg" placeholder={placeholder} value={value} onChange={onChange} />
    </fieldset>
  )
}