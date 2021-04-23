import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Auth.module.scss';
import SelectUser from '../SelectUser/SelectUser';
import Button from '@material-ui/core/Button'
import store, { initialState, TCHAT_ACTIONS } from '../../reducers/store';

const Auth = () => {
  const[connectUser,setconnectUser] = useState(initialState.connectedUser);
  return(
  <div className={styles.Auth} data-testid="Auth">
    <div className={styles.content}>
      <h2>Authentification</h2>
      <img src={null!==connectUser?connectUser.img:'img/noimg.png'} alt='connect face' /><br />
      <SelectUser onuserselectionchange={(id=>{
        const currentSelectedUser = store.getState().tchatUsers.find(e=>e.id===id)
        undefined!==currentSelectedUser?setconnectUser(currentSelectedUser):setconnectUser(initialState.connectedUser);
      })} selectedId={null !== connectUser?connectUser.id:-1}>
        <option value="-1">Sélectionnez un user</option>
      </SelectUser>
      <br />
      <Button variant="outlined" color="primary" onClick={
        e=>{
          if(initialState.connectedUser!==connectUser)store.dispatch({type:TCHAT_ACTIONS.CONNECT_USER,value:connectUser})
        }
      }>
        Connect
      </Button>
    </div>
  </div>
);
  }

Auth.propTypes = {};

Auth.defaultProps = {};

export default Auth;
