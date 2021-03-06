import {createStore, CreateStore} from 'redux';
import { REST_ADR } from '../config/config';

export const initialState = {
    messages:[],
    tchatUsers:[],
    destinataireId:-1,
    connectedUser:null
}

export const TCHAT_ACTIONS=Object.freeze({
    ADD_USERS:'ADD_USERS',
    ADD_USER:'ADD_USER',
    ADD_MESSAGES:'ADD_MESSAGES',
    SEND_MESSAGE:'SEND_MESSAGE',
    SELECT_DEST:'SELECT_DEST',
    CONNECT_USER:'CONNECT_USER',
    DISCONNECT_USER:'DISCONNECT_USER'
});

const TCHAT_PRIVATE_ACTIONS=Object.freeze({
    INIT:'@@redux/INIT',
    INIT_PULLING:'INIT_PULLING',
    PULLING:'PULLING'
});

function tchatReducer(state=initialState, action){
    console.log(action.type);
    if(action.type.includes('@@redux/INIT')){action.type=TCHAT_PRIVATE_ACTIONS.INIT;}
    switch(action.type)
    {
        case TCHAT_PRIVATE_ACTIONS.INIT:
            fetch(`${REST_ADR}/messages`).then(f=>f.json()).then(o=>{
                store.dispatch({type:TCHAT_ACTIONS.ADD_MESSAGES,values:o});
            });
            fetch(`${REST_ADR}/tchatUsers`).then(f=>f.json()).then(o=>{
                store.dispatch({type:TCHAT_ACTIONS.ADD_USERS,values:o});
            });
            setInterval(()=>{store.dispatch({type:TCHAT_PRIVATE_ACTIONS.PULLING})}, 5000);
            return state;
        case TCHAT_ACTIONS.SEND_MESSAGE:
            fetch(`${REST_ADR}/messages`,{method:'POST', body:JSON.stringify(action.value),
        headers:{'Content-Type' : 'application/json'}})
            .then(f=>{console.log(f)},f=>{console.log(f);})
            return state;
        case TCHAT_PRIVATE_ACTIONS.PULLING:
            let last = 0;
            state.messages.forEach((e)=>{last=e.id>last?e.id:last;})
            fetch(`${REST_ADR}/messages?id_gte=${last+1}`)
            .then(f=>f.json())
            .then(o=>{
                if(o.length <= 0) return;
                store.dispatch({type:TCHAT_ACTIONS.ADD_MESSAGES,values:o});
            });
            return state;
        case TCHAT_ACTIONS.ADD_USERS:return {...state,tchatUsers:[...state.tchatUsers,...action.values]};
        case TCHAT_ACTIONS.ADD_USER:return {...state,tchatUsers:[...state.tchatUsers,action.value]};
        case TCHAT_ACTIONS.ADD_MESSAGES:return {...state,messages:[...state.messages,...action.values]};
        case TCHAT_ACTIONS.SELECT_DEST:return {...state,destinataireId:action.value};
        case TCHAT_ACTIONS.CONNECT_USER:return {...state,connectedUser:action.value};
        case TCHAT_ACTIONS.DISCONNECT_USER:return {...state,connectedUser:null};
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

