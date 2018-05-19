import React, { PureComponent }                                   from 'react';
import moment                                                     from 'moment';
import Loading                                                    from '../../RecyclableComponents/Loading';
import ChatComponent                                              from './ChatComponent';

export default class ChatContainer extends PureComponent {
  state = {
    typingText: '',
    sender: this.props.auth.username,
    loading: true,
    recipient: this.props.computedMatch.params.recipient,
    messages: null,
  };

  fetchData = (callback) => {
    const { axios } = this.props;
    const { recipient } = this.state;
    this.setState({ updatingNewMessage: true }, () => {
      axios().get(`api/chat/${recipient}`)
        .then(({ data }) => {
          this.setState({ messages: data });
          if (callback) {
            callback();
          }
        })
        .finally(() => {
          this.setState({ updatingNewMessage: false });
        });
    });
  };

  intervalFetchData = () => {
    if (!this.state.updatingNewMessage) {
      this.fetchData();
    }
  };

  componentDidMount() {
    this.fetchData(() => {
      this.setState({ loading: false });
      this.intervalMessageUpdate = setInterval(this.intervalFetchData, 3000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalMessageUpdate);
  }

  onChangeText = (e) => {
    this.setState({ typingText: e.target.value });
  };

  handlePostMessage = (event) => {
    event.preventDefault();
    const { recipient, typingText } = this.state;
    const { axios } = this.props;
    const resBody = {
      receiver: recipient,
      message: typingText,
    };
    axios().post(`api/chat/${recipient}`, resBody)
      .then(({ data }) => {
        this.setState({ typingText: '' });
        this.fetchData();
      });
  };

  render() {
    const { loading, messages, sender, recipient, typingText } = this.state;
    if (loading) {
      return <Loading/>
    }
    return (
      <ChatComponent
        sender={sender}
        recipient={recipient}
        messages={messages}
        handlePostMessage={this.handlePostMessage}
        typingText={typingText}
        onChangeText={this.onChangeText}
      />
    );
  }
}
