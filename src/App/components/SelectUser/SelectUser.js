import React from 'react';
import PropTypes from 'prop-types';
import './SelectUser.scss';

const SelectUser = (props) => (
  <select className="SelectUser" data-testid="SelectUser" value={props.selectedId} onChange={(evt)=>props.onuserselectionchange(parseInt(evt.target.value))}>
    {props.users.map((e,i)=><option value={`${e.id}`} >{`${e.id}:${e.login}`}</option>)}
  </select>
);

SelectUser.propTypes = {
   users:PropTypes.array.isRequired,
   selectedId:PropTypes.number,
   onselectchange:PropTypes.func.isRequired,
  };

SelectUser.defaultProps = {};

export default SelectUser;
