export default function NoteControls({
  handleSave,
  handleRemoveNote,
  id,
  handlePin,
  handleColor,
  handleLabel,
  handleDuplicate,
  handleShare,
}) {
  return (
    <div className="flex space-between note-controls">
      {handleSave ? (
        <button
          title="save note"
          className="note-btn note-btn-save"
          onClick={(ev) => {
            ev.preventDefault()
            handleSave(ev)
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      ) : (
        <button
          title="remove note"
          className="note-btn note-btn-remove"
          onClick={(ev) => {
            ev.preventDefault()
            handleRemoveNote(id)
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
      <button
        title="note color"
        className="note-btn note-btn-color"
        onClick={(ev) => {
          ev.preventDefault()
          handleColor(ev)
        }}
      >
        <i className="fas fa-palette"></i>
      </button>
      {!handleSave ? (
        <button
          onClick={(ev) => {
            ev.preventDefault()
            handleDuplicate(ev)
          }}
          title="duplicate note"
          className="note-btn note-btn-duplicate"
        >
          <i className="fas fa-clone"></i>
        </button>
      ) : (
        ""
      )}
      {!handleSave ? (
        <button
          onClick={(ev) => {
            ev.preventDefault()
            handleShare(ev)
          }}
          title="share note"
          className="note-btn note-btn-share"
        >
          <i className="fas fa-share"></i>
        </button>
      ) : (
        ""
      )}
      <button
        onClick={(ev) => {
          ev.preventDefault()
          handleLabel(ev)
        }}
        title="label note"
        className="note-btn note-btn-label"
      >
        <i className="fas fa-tag"></i>
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault()
          handlePin(ev)
        }}
        title="pin note"
        className="note-btn note-btn-pin"
      >
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  )
}
