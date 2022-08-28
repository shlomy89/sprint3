import TodoLi from "./todo-li.jsx"
import { utilService } from "../../../services/util.service.js"

// export default function NoteTodo({ note }) {
export default class NoteTodo extends React.Component {
  componentDidMount(){

  }
  render() {
    const { note } = this.props
    console.log(note.info)
    return (
      <div className="note-todo">
        {note.info.title ? <h2>{note.info.title}</h2> : ""}
        <ul className="clean-list">
          {note.info.todos.map((todo) => (
            <TodoLi key={todo.text} todo={todo} />
          ))}
        </ul>
      </div>
    )
  }
}