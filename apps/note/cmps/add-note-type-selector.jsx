
export default function AddNoteTypeSelector(props) {
    const {handleClick} = props
  return (
    <div className="flex add-note-type">
    <button
      className="add-note-type text-btn"
      onClick={() => handleClick("text" ,"Take a note...")}
    >
      Take a note...
    </button>
    <button
      className="add-note-type img-btn"
      onClick={() => handleClick("image" , "URL")}
    >
      <i className="fas fa-image"></i>
    </button>
    <button
      className="add-note-type yt-btn"
      onClick={() => handleClick("iframe", "URL")}
    >
      <i className="fab fa-youtube"></i>
    </button>
    <button
      className="add-note-type todo-btn"
      onClick={() => handleClick("todos" , "Enter Comma seperated list")}
    >
      <i className="far fa-check-square"></i>
    </button>
  </div>
  )
}
