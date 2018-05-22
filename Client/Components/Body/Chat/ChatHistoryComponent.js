import React, { PureComponent }                                   from 'react';
import PropTypes                                                  from 'prop-types';
import { List }                                                   from 'antd';
import { Link }                                                   from 'react-router-dom';
import Loading                                                    from '../../RecyclableComponents/Loading';

export default class ChatHistoryComponent extends PureComponent {
  static defaultProps = {
    messageRecipientList: PropTypes.array.isRequired,
  };

  renderColumn = (username) => {
    const { loading, messageRecipientList } = this.props;
    if (loading && !messageRecipientList.length) {
      return <Loading/>;
    }
    return (
      <List.Item>
        <Link to={`/chat/${username}`}>{username}</Link>
      </List.Item>
    );
  };

  render() {
    const { messageRecipientList } = this.props;
    const header = (
      <h3>Conversation list</h3>
    );
    return (
      <div className="chat-container">
        <div className="chat-container_history">
          <List
            header={header}
            footer={null}
            bordered
            dataSource={messageRecipientList}
            renderItem={this.renderColumn}
          />
        </div>
      </div>
    )
  }
}