import {createStore, CreateStore} from 'redux';
import { REST_ADR } from '../config/config';

const initialState = {
    messages:[],
    tchatUsers:[]
}

function tchatReducer(state=initialState, action){
    console.log(action.type);
    if(action.type.includes('@@redux/INIT')){action.type='@@redux/INIT'}
    switch(action.type)
    {
        case '@@redux/INIT':
            fetch(`${REST_ADR}/messages`).then(f=>f.json()).then(o=>{
                store.dispatch({type:'ADD_MESSAGES',values:o});
            })
            return state;
        case 'ADD_USER':return {...state,tchatUsers:[...state.tchatUsers,...action.values]};
        case 'ADD_USERS':return {...state,tchatUsers:[...state.tchatUsers,...action.values]};
        case 'ADD_MESSAGES':return {...state,messages:[...state.messages,...action.values]};
        default:return state;
    }
}

const store=createStore(tchatReducer);
export default store;

store.subscribe(()=>{
    console.log(store.getState());
});

// store.dispatch({type:'ADD_USERS', values:[{login:'alex'}, {login:'boby'}]});
// store.dispatch({type:'ADD_USERS', values:[{login:'pascal'}, {login:'dominique'}]});
// store.dispatch({type:'ADD_USERS', values:[{login:'pierre'}, {login:'jean'}]});

