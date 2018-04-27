import React, { Component }                                       from 'react';
import ProfileForm                                                 from './Profile_Component';
import { Consumer }                                               from '../../../context';
import { Consumer as MainConsumer }                               from '../../../main';

export default class Profile_Container extends Component {

  render(){

    console.log('the props inside Profile is ', this.props);
    //  need to get name, type and loggedIn from context\

          return(
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1">
                <MainConsumer>
                  { context => <ProfileForm {...this.props} {...context}/>}
                </MainConsumer>
              </div>
            </div>
          )
        }
}
