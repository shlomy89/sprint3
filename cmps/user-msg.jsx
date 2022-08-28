import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {
  unsubscribe
  state = {
    msg: null
  }

  componentDidMount() {
    this.unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(this.closeMsg, 2000)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  closeMsg = () => {
    this.setState({ msg: null })
  }

  render() {
    const { msg } = this.state
    const { closeMsg } = this

    if (!msg) return <span></span>
    return (
      <div className="wrapper">
        <section className={'user-msg ' + msg.type}>
          <h3>{msg.txt}</h3>
          <a className="close" onClick={closeMsg}>&times;</a>
        </section>
      </div>
    )
  }
}
