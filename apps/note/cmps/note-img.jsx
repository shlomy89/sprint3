
export default function NoteImg({ note }) {
  return (
    <div className="note-img">
      <img className="note-img-img"  src={`${note.info.url}`} alt={note.info.url} />
      <h2 className="note-img-title">{note.info.title}</h2>
    </div>
  )
}