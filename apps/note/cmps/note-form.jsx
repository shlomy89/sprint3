import NoteControls from "./note-controls.jsx"
export default class NoteForm extends React.Component {
  state = {
    info: { title: "", text: "" },
  }

  handleFormChange = ({ target }) => {
    const field = target.name
    const value = target.type === "number" ? +target.value : target.value
    this.setState((prevState) => ({
      info: {
        ...prevState.info,
        [field]: value,
      },
    }))
  }
  handleSubmit = () => {
    console.log("submit")
    this.props.handleSave(this.state.info)
    this.setState({ info: { title: "", text: "" } })
  }
  render() {
    const { handleSubmit, handleFormChange } = this
    const { title, text } = this.state.info
    const {
      type,
      handleSave,
      placeholder,
      handleColor,
      handlePin,
      handleLabel,
    } = this.props
    return (
      <form
        className="flex column add-note note-form"
        onSubmit={this.handleSubmit}
      >
        <input
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={(ev) => handleFormChange(ev)}
        />
        <input
          placeholder={placeholder}
          type="text"
          name={
            type === "image" || type === "iframe"
              ? "url"
              : type === "todos"
              ? "todos"
              : "text"
          }
          value={text}
          onChange={(ev) => handleFormChange(ev)}
        />
        <NoteControls
          handleSave={handleSubmit}
          handleColor={handleColor}
          handleLabel={handleLabel}
          handlePin={handlePin}
        />
      </form>
    )
  }
}
