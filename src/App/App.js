import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button/Button';
import User from './components/User/User';
import FormUser from './components/FormUser/FormUser';
import SelectUser from './components/SelectUser/SelectUser';

class App extends Component {
  constructor(props){
    super(props);
    this.state={count:0, users:[]};
  }

  componentDidMount(){
    fetch('http://desorbaix.alexandre.free.fr/phpRest/users/').then(e=>e.json(),e=>[]).then(o=>{
      console.log(o)
      this.setState({count:o.length, users:o, selectedUser:null, selectedId:null})
      return o;
    });
  }

remove(){
  this.setState({count:this.state.count-1});
  console.log('remove', this.state.count);
}


  render() {
    return (
      <div>
        La valeur de count est {this.state.count}<br />
        <Button title="Add" onclickbutton={()=>{
          this.setState({count:this.state.count+1});
          console.log('add', this.state.count);
        }}></Button>

        <Button bgColor="tomato" title="remove" onclickbutton={()=>{this.remove()}}></Button>
        {this.state.users.length>0 && <User user={this.state.users[0]} />}
        <hr />
         {this.state.selectedUser && <FormUser onchangevalue={(value=>{
           this.setState({selectedUser:value});
         })} user={this.state.selectedUser} />} 
        <hr />
        {this.state.users.map((e,i)=><User onclickuser={(userSelected) => {this.setState({selectedUser:userSelected})}} key={'user-'+i} user={e} style={{display:'inline-block', border:'1px solid black', margin:'10px', padding:'10px'}} />
        )}
        <SelectUser users={this.state.users} selectedId={this.state.selectedId} onuserselectionchange={(id)=>this.setState({selectedId:id})} />
        <hr/>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

App.propTypes = {

};

export default App;