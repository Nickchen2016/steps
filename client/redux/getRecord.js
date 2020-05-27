import axios from 'axios';

//Initial State
const InitialState = {};

//common url
const url = 'http://192.168.1.7:5000/record'

//Action Type
const GET_RECORD = 'GET_RECORD';
const POST_RECORD = 'POST_RECORD';
const PATCH_RECORD = 'PATCH_RECORD';

//Action Creator
export function getRecord(record) {
    return {type:'GET_RECORD', record}
}
export function postRecord(record) {
    return {type:'POST_RECORD', record}
}
export function patchRecord(record) {
    return {type:'PATCH_RECORD', record}
}

//Thunk Creator
export const fetchRecord = ()=>
    dispatch =>
        axios.get(url)
        .then(res=>{
            dispatch(getRecord(res.data));
        })
        .catch(err=> console.log(err));

export const createRecord = (credentials)=> 
    dispatch =>
        axios.post(url, credentials)
        .then(res=>
            dispatch(postRecord(res.data)))
        .catch(err=> console.log(err));

export const updateRecord = (credentials)=>
    dispatch =>
        axios.patch(url+`/${credentials.id}`, credentials)
        .then(res=>
            dispatch(patchRecord(res.data)))
        .catch(err=> console.log(err));

//Reducer
export default function(state=InitialState, action) {
    switch(action.type){
        case GET_RECORD:
        return action.record;
        case POST_RECORD:
        return action.record;
        case PATCH_RECORD:
        return action.record;
        default:
        return state;
    }
}