import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const User = (props) => (
  <div onClick={() => props.onclickuser(props.user)} className="User" style={props.style} data-testid="User">
    id:{props.user.id}<br />
    password:{props.user.password}<br />
    login:{props.user.login}<br />
  </div>
);

User.propTypes = {};

User.defaultProps = {};

export default User;
