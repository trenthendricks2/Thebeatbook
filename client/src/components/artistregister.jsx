import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import {open} from '../actions'
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import ArtistRegisterForm from './artistregisterform.jsx'
import { withRouter } from 'react-router';

const logo = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'
const ArtistRegisterFormContainer = Form.create()(ArtistRegisterForm); //component for antd loginform

class ArtistRegister extends React.Component {
  constructor(props) {
      super(props)
  };

  componentDidMount() {
      console.log('artistregister', this)
  };

  goHome() {
      console.log('clicked')
      this.props.history.replace('/')
  };

  registerArtist(username, password, email, city, state) {
    axios.post('/register/artist', {
        username: username,
        password: password,
        email: email,
        city: city,
        state: state
    }).then(res => {
        this.actions.loadArtistPage(res.data)
        this.actions.setArtist(res.data[1].artist_id)
        this.history.replace('/')
    }).catch(err => {
        console.log('error', err)
    })
  };

  render() {
      return(
          <div style={styles.registerbox}>
                    <img src={logo} style={styles.logo}></img>
                    <div style={styles.beatbook}>beatbook</div>
                    <div style={styles.divider}></div>
                    <div style={styles.registerform}>
                      <ArtistRegisterFormContainer registerArtist={this.registerArtist}/>
                    </div>
                    <Icon style={styles.goback} type="left" onClick={() => this.goHome()}/>
                  </div >
      )
  };
};

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistRegister));


const styles = {
    logo: {
        height: 20,
        width: 20,
        display: 'inline-block'

    },
    beatbook: {
        fontSize: 20,
        fontFamily: 'system-ui',
        marginTop: '5%',
        display: 'inline-block'
    },
    loginbutton: {
        textAlign: 'center'
    },
    registerbox: {
        //backgroundColor: 'rgba(120, 120, 120, 0.25)',
        backgroundColor: 'white',
        // opacity: 0.5,
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: .5,
        borderColor: '#e6e6e6',
        width: '25%',
        height: '75%',
        left: '37.5%',
        top: '12.5%',
        textAlign: 'center',
        overflow:'auto'
    },
    registerform: {
        marginLeft: 50,
        marginRight: 50

    },
    divider: {
        borderStyle: 'solid',
        borderWidth: .5,
        borderColor: '#e6e6e6',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 50,
        marginBottom: 50
    },
    goback: {
        fontSize: 25,
        marginTop: 0
    }
}
