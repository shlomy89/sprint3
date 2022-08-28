import NoteControls from "./note-controls.jsx";
export default function NoteText({ note }) {
  // console.log(note)
  return (
    <div className="note-text" onChange={(ev) => handleChange(ev)}>
      <h1>{note.info.title}</h1>
      <p>{note.info.text}</p>
    </div>
  )
}

{/* <div className="add-note note-text" onChange={(ev) => handleChange(ev)}> */}