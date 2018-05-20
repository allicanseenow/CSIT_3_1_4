import React, { Component }                                       from 'react';
import ChatHistoryComponent                                       from "./ChatHistoryComponent";

export default class ChatHistoryContainer extends Component {
  state = {
    loading: true,
    messageRecipientList: [],
  };

  componentDidMount() {
    const { axios } = this.props;
    axios().get(`api/chat/users`)
      .then(({ data }) => {
        this.setState({ messageRecipientList: data || [] });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, messageRecipientList } = this.state;
    return (
      <ChatHistoryComponent
        messageRecipientList={messageRecipientList}
        loading={loading}
      />
    )
  }
}