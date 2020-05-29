import axios from 'axios';

//Initial State
const initialState = [];

//common url
const url = 'http://192.168.1.7:5000/data';

//Action Type
const GET_DATA = 'GET_DATA';
const POST_DATA = 'POST_DATA';
const PATCH_DATA = 'PATCH_DATA';
const DELETE_DATA = 'DELETE_DATA';

//Action Creator
export function getData(data) {
    return {type:'GET_DATA', data}
}
export function postData(data) {
    return {type:'POST_DATA', data}
}
export function patchData(data) {
    return {type:'PATCH_DATA', data}
}
export function deleteData(data) {
    return {type:'DELETE_DATA', data}
}

//Thunk Creator
export const fetchData = ()=>
    dispatch =>
        axios.get(url)
        .then(res=>
            dispatch(getData(res.data)))
        .catch(err=> console.log(err));

export const createNewWeek = (credentials)=>
    dispatch =>
        axios.post(url, credentials)
        .then(res=>
            dispatch(postData(res.data)))
        .catch(err=> console.log(err));


export const updateData = (credentials)=>
    dispatch =>
        axios.patch(url+`/${credentials.id}`, credentials)
        .then(res=>
            dispatch(patchData(res.data)))
        .catch(err=> console.log(err));

export const removeData = (credentials)=>
    dispatch =>
        axios.delete(url+`/${credentials.id}`)
        .then(res=>
            dispatch(deleteData(res.data)))
        .catch(err=> console.log(err));


//Reducer
export default function(state=initialState, action) {
    switch(action.type){
        case GET_DATA:
        return action.data;
        case POST_DATA:
        return action.data;
        case PATCH_DATA:
        return action.data;
        case DELETE_DATA:
        return action.data;
        default:
        return state;
    }
}