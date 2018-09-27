import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const UPDATE_ZIP = 'UPDATE_ZIP';
export const UPDATE_USERID = 'UPDATE_USERID';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_BY_USERID = 'FETCH_BY_USERID';

const rooturl = 'https://reduxblog.herokuapp.com/api'

var jonurl = 'http://18.224.150.52';

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

// fetching a single post based on messageId   --- fetch all the posts based on zipcode
export function fetchPost(id){
	//const request = axios.get(`${jonurl}/posts/${id}${API_KEY}`);
	const request = axios.get(`${jonurl}/serviceById/${id}`)
	return {

		type : FETCH_POST,
		payload : request
	}
}

export function getServiceByUserId(id){

		var jonurl = 'http://18.224.150.52';

		const url = `${jonurl}/servicesByUserId?id=${id}`

		const request = axios.get(url);

		return {

			type : FETCH_BY_USERID,
			payload : request
		}
}

export function getServiceByFulfillerId(id){

	var jonurl = 'http://18.224.150.52';

	const url = `${jonurl}/servicesByFulfillerId?id=${id}`

	const request = axios.get(url);

		return {

			type : FETCH_BY_USERID,
			payload : request
		}
}


export function deletePost(id , callback){
	
	const request = axios.get(`${jonurl}/delete/${id}`).then(()=>{
		callback()
	});

		return {

		type : DELETE_POST,
		payload : id
	}

}

export function updateZip() {
	return {
		type : UPDATE_ZIP,
		payload : "0000"
	}
}

export function updateUserId(){
	return {
		type : UPDATE_USERID,
		payload : "1234"
	}
}

export function updateUserName(){
	return {
		type : UPDATE_USERNAME,
		payload : "pooja"
	}
}