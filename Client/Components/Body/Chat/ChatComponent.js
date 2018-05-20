import React, { PureComponent }                                       from 'react';
import PropTypes                                                      from 'prop-types';
import { Link }                                                       from 'react-router-dom';
import Message                                                        from './Message';

export default class ChatComponent extends PureComponent {
  static propTypes = {
    // This user (stored in props.auth)
    sender: PropTypes.string.isRequired,
    // The user that this user is talking to
    recipient: PropTypes.string.isRequired,
    typingText: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    handlePostMessage: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    previousListing: PropTypes.string,
  };

  static defaultProps = {
    previousListing: null
  };

  msgs = [];

  sendMessage = (event) => {
    this.props.handlePostMessage(event);
  };

  renderMessage = () => {
    const { messages } = this.props;
    // Get the latest 100 messages if length > 100;
    let latestMessages = messages;
    if (latestMessages.length > 100) {
      latestMessages = latestMessages.slice(-100);
    }
    return _.map((latestMessages), (aMessage, index) => {
      const { sender, receiver, message, tstamp } = aMessage;
      let focusTabIndex = 0;
      if (index === messages.length - 1) {
        focusTabIndex = -1;
      }
      return <Message sender={this.props.sender} recipient={this.props.recipient} message={message} time={tstamp} left={this.props.sender !== sender} key={tstamp} tabIndex={+focusTabIndex} />
    });
  };

  componentDidMount() {
    const ul = this.ul;
    ul.scrollTop = ul.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length && this.props.messages.length) {
      const ul = this.ul;
      ul.scrollTop = ul.scrollHeight;
    }
  }

  render() {
    const { recipient, typingText, onChangeText, previousListing } = this.props;
    return (
      <div>
        { previousListing && (
          <div style={{ paddingBottom: "15px"}}>
            <Link to={`/display-car-listing/${previousListing}`}>
              Back to the car listing
            </Link>
          </div>
        )}
        <div className="chat-container">
          <div className="chat-container_chatroom">
            <h3>{recipient}</h3>
            <ul className="chat-container_chatroom_chats" ref={(ul) => this.ul = ul }>
              { this.renderMessage() }
            </ul>
            <div className="chat-container_chatroom_input_container">
              <form className="chat-container_chatroom_input" onSubmit={this.sendMessage}>
                <input type="text" value={typingText} onChange={onChangeText} />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
