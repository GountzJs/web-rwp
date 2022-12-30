export function TextAreaCustom({ name, placeholder, value, disabled, onChange }) {
  return (
    <fieldset className="form-group">
      <textarea
        name={name}
        className="form-control form-control-lg"
        disabled={disabled}
        rows={8}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </fieldset>
  )
}