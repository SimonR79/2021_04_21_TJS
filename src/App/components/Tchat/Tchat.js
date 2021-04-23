import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Tchat.module.scss';
import TchatViewer from '../TchatViewer/TchatViewer';
import TchatUsers from '../TchatUsers/TchatUsers';
import TchatWriter from '../TchatWriter/TchatWriter';
import { REST_ADR } from '../../config/config';
import store, { TCHAT_ACTIONS } from '../../reducers/store';
import { Button } from '@material-ui/core';

const initialState={messages:[], tchatUsers:[]}

class Tchat extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
  }

  componentDidMount(){
    fetch(`${REST_ADR}/tchatUsers`)
    .then(f=>f.json(),f=>{console.log(f);return []})
    .then(jsonArr=>{this.setState({tchatUsers:jsonArr});
    return jsonArr;})
  }
  render(props) {
    return (
      <div className={style.Tchat}>
        <h1>Tchat<Button variant="contained" color="primary" onClick={(e)=>store.dispatch({type:TCHAT_ACTIONS.DISCONNECT_USER})}>Disconnect</Button></h1>
        <div className={style.horizontal}>
          <TchatViewer></TchatViewer>
          <TchatUsers users={this.state.tchatUsers}></TchatUsers>
        </div>
        <TchatWriter></TchatWriter>
      </div>
    );
  }
}

Tchat.propTypes = {

};

Tchat.defaultProps = {};

export default Tchat;
