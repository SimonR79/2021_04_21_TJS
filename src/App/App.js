import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button/Button';
import User from './components/User/User';
import FormUser from './components/FormUser/FormUser';
import SelectUser from './components/SelectUser/SelectUser';
import TchatUsers from './components/TchatUsers/TchatUsers';
import Tchat from './components/Tchat/Tchat';

class App extends Component {
  constructor(props){
    super(props);
    this.state={count:0, users:[]};
  }

  componentDidMount(){
//     fetch('http://desorbaix.alexandre.free.fr/phpRest/users/').then(e=>e.json(),e=>[]).then(o=>{
//       console.log(o)
//       this.setState({count:o.length, users:o, selectedUser:null, selectedId:null})
//       return o;
//     });
//   }

// remove(){
//   this.setState({count:this.state.count-1});
//   console.log('remove', this.state.count);
}


  render() {
    return (
      <div>
        <Tchat></Tchat>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;