export function NavArticles({ options, select, setSelect }) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {
          options.map((op, idx) =>
            <li key={idx} className="nav-item">
              <button
                disabled={op.disabled}
                className={`
                  nav-link
                  ${ op.disabled ? 'disabled' : ''}
                  ${select === op.name ? 'active' : ''}
                `}
                onClick={() => setSelect(op.name)}
              >
                { op.name }
              </button>
            </li>
          )
        } 
      </ul>
    </div>
  )
}