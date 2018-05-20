import React, { PureComponent }                                       from 'react';
import PropTypes                                                      from 'prop-types';
import { Avatar }                                                     from 'antd';

export default class Message extends PureComponent {
  static propTypes = {
    sender: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    left: PropTypes.bool.isRequired,
  };

  render() {
    const { sender, recipient, message, time, left } = this.props;
    let avatarInitial;
    if (left) {
      avatarInitial = recipient.charAt(0);
    }
    else {
      avatarInitial = sender.charAt(0);
    }
    return (
      <li className={`chat-container_chatroom_chats_chat ${left ? 'left' : 'right'}` }>
        <div style={{ display: "table" }}>
          <div className="chat-container_chatroom_chats_chat_avatar">
            <Avatar
              size="large"
              className="chat-container_chatroom_chats_chat_img"
            >
              { avatarInitial }
            </Avatar>
          </div>
          <div className="chat-container_chatroom_chats_chat_message">{message}</div>
        </div>
      </li>
    )
  }
}