import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const UPDATE_ZIP = 'UPDATE_ZIP';

const rooturl = 'https://reduxblog.herokuapp.com/api'

var jonurl = 'http://18.191.218.237:80';

 const API_KEY = '?key=PAPERCLIP1234';

export function fetchPosts(zip){

	// const url = `${rooturl}/posts${API_KEY}`
	console.log('zip',zip);

	const url = `${jonurl}/servicesByZip?zip=${zip}`

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

	// const request = axios.post(`${rooturl}/posts${API_KEY}`, values)
	// .then(()=>{
	// 	callback()
	// });
	const request = axios.post(`${jonurl}/service`, values)
	.then(()=>{
		callback()
	});

	console.log('values inside createPost',values);

	return {
		type : CREATE_POST,
		payload : request //response data from the API
	}

}

// fetching a single post based on id   --- fetch all the posts based on zipcode
export function fetchPost(id){
	const request = axios.get(`${rooturl}/posts/${id}${API_KEY}`);
	consolelog('inside fetchPost',id);

	return {

		type : FETCH_POST,
		payload : request
	}
}

export function updateZip() {
	return {
		type : UPDATE_ZIP,
		payload : "0000"
	}
}