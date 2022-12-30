export function ButtonForm({ action, name, disabled }) {
  return (
    <button type="button" disabled={disabled} className="btn btn-lg btn-primary pull-xs-right" onClick={action}>
      { name }
    </button>
  )
}