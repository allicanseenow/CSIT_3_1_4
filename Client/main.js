import React, { Component, createContext }      from 'react';
import Header                                   from './Components/Header';
import Home                                     from './Components/Home';

const MainContext = createContext();
export const { Consumer } = MainContext;

export default class Main extends Component {
  state = {
    loggedIn: false,
    username: '',
    type: '',
  };

  setLoginStatus = ({ loggedIn, username, type }, callback) => {
    this.setState({ loggedIn, username, type }, callback);
  };

  componentWillMount() {
    const { axios } = this.props;
    axios().get('http://localhost:9000/api/account')
      .then(({ data }) => {
        this.setState({
          username: data.username,
          type: data.type,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.log("Error is ", err);
      });
  };

  render() {
    const { username, type, loggedIn } = this.state;
    console.log('mainjs state is ---', this.state)
    return (
      <MainContext.Provider value={{
        username, type, loggedIn,
        setLoginStatus: this.setLoginStatus,
      }}>
        <Header {...this.props}/>
        <Home {...this.props}/>
      </MainContext.Provider>
    )
  }
}

