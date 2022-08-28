export default class TodoLi extends React.Component {
  state = {
    doneAt: this.props.todo.doneAt,
    text: this.props.todo.text,
  }

  handleClick = (e) => {
    if (this.state.doneAt) {
      this.setState({
        doneAt: null,
      })
    } else {
      this.setState({
        doneAt: Date.now(),
      })
    }
    console.log("clicked li", e)
  }
  render() {
    const { handleClick } = this
    const { doneAt, text } = this.state
    return (
      <li className="todo-li" onClick={() => handleClick(text)}>
        {doneAt ? (
          <span>
            <i className="far fa-check-square "></i>
          </span>
        ) : (
          <span>
            <i className="far fa-square"></i>
          </span>
        )}
        <p className={`todo-li-text ${doneAt ? "todo-li-checked" : ""}`}>
          {text}
        </p>
      </li>
    )
  }
}
