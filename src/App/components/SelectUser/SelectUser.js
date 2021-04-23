import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SelectUser.module.scss';
import store,{initialState} from '../../reducers/store';

const SelectUser = (props) => {
  const [users, setusers] = useState(initialState.tchatUsers);
  useEffect(() => {
   setusers(store.getState().tchatUsers);
   store.subscribe(()=>{
     setusers(store.getState().tchatUsers);
   })
  }, []);
  return(
  <select className="SelectUser" data-testid="SelectUser" value={props.selectedId} 
  onChange={(evt)=>props.onuserselectionchange(parseInt(evt.target.value))}>
    {props.children}
    {users.map((e,i)=><option key={`user-${e.id}`} value={`${e.id}`} >{`${e.id}:${e.login}`}</option>)}
  </select>
);}

SelectUser.propTypes = {
   selectedId:PropTypes.number,
   onselectchange:PropTypes.func.isRequired,
  };

SelectUser.defaultProps = {};

export default SelectUser;
