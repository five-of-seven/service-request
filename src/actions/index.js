import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';

const rooturl = 'https://reduxblog.herokuapp.com/api'

const API_KEY = '?key=PAPERCLIP1234';

export function fetchPosts(){

	const url = `${rooturl}/posts${API_KEY}`

	const request = axios.get(url);

	return {

		type: FETCH_POSTS,
		payload: request
	}
}

//define action
//use axios to make network request to https://reduxblog.herokuapp.com/ 
//add ReduxPromise as middleware 

export function createPost(values,callback){

	const request = axios.post(`${rooturl}/posts${API_KEY}`, values)
	.then(()=>{
		callback()
	});

	return {
		type : CREATE_POST,
		payload : request
	}

}


export function fetchPost(id){
	const request = axios.get(`${rooturl}/posts/${id}${API_KEY}`);

	return {

		type : FETCH_POST,
		payload : request
	}
}