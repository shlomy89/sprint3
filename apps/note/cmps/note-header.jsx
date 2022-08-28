export class NoteHeader extends React.Component {
  state = {
    filterBy: {
      text: "",
      label: "",
      type: "",
      pinned: "",
    },
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === "number" ? +target.value : target.value
    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.props.onSetFilter(this.state.filterBy)
      }
    )
  }
  render() {
    const { text, label, type, pinned } = this.state
    return (
      <div className="flex align-center space-between note-header">
        {/* <i class="fa-solid fa-bars"></i> */}
        {/* <i class="fa-solid fa-ellipsis"></i> */}
        {/* <div className="header-notes "></div> */}
        <div className="flex note-header-title-container">
          <div className="flex note-header-title">
            <h1>Keep</h1>
            <div>
              <img src="../assets/img/keep-logo.png" />
            </div>
          </div>
        </div>

        <div className=" flex note-header-ui ">
          <form className="flex note-header-search-form">
            <button className="note-search-form-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              className="note-search-form-input"
              type="search"
              placeholder="search"
              value={text}
              onChange={this.handleChange}
            />
          </form>

          <ul className=" clean-list flex note-header-settings">
            <li className="note-settings-gear flex align-center justify-center">
              <i className="fa-solid fa-gear"></i>
            </li>
            <li className="note-setting-display flex align-center justify-center">
              <i className="fa-solid fa-grip-lines"></i>
            </li>
            <li className="note-settings-refresh flex align-center justify-center">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </li>
          </ul>
        </div>
        <div className="flex user-prefrences"></div>
      </div>
    )
  }
}
