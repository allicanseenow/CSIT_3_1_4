import React, { Component, createContext }      from 'react';
import Header                                   from './Components/Header';
import Home                                     from './Components/Home';
import Footer                                   from './Components/Footer/Footer';

const MainContext = createContext();
export const { Provider, Consumer } = MainContext;

export default class Main extends Component {
  state = {
    loggedIn: false,
    username: '',
    type: '',
    loadAuthentication: false,
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
      })
      .finally(() => {
        this.setState({ loadAuthentication: true })
      });
  };

  render() {
    const { username, type, loggedIn, loadAuthentication } = this.state;
    if (!loadAuthentication) return <div/>;
    return (
      <MainContext.Provider value={{
        username, type, loggedIn,
        setLoginStatus: this.setLoginStatus,
      }}>
        <Header {...this.props}/>
        <Home {...this.props} auth={this.state}/>
        <Footer {...this.props}/>
      </MainContext.Provider>
    )
  }
}

