import axios from 'axios';
import $ from 'jquery';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const UPDATE_ZIP = 'UPDATE_ZIP';
export const UPDATE_USERID = 'UPDATE_USERID';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_BY_USERID = 'FETCH_BY_USERID';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
const config = require('../../config.js');



export function fetchPosts(zip){


	const url = `${config.SERVICE_DATABASE_URL}/servicesByZip?zip=${zip}`

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
	const request = axios.post(`${config.SERVICE_DATABASE_URL}/service`, values)
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
	const request = axios.get(`${config.SERVICE_DATABASE_URL}/serviceById/${id}`)
	return {

		type : FETCH_POST,
		payload : request
	}
}

export function fetchComments(id){

	const request = axios.get(`${config.SERVICE_DATABASE_URL}/commentsByServiceId/${id}`);

	return {

		type : FETCH_COMMENTS,
		payload : request
	}
}

export function getServiceByUserId(id){

		const url = `${config.SERVICE_DATABASE_URL}/servicesByUserId?id=${id}`

		const request = axios.get(url);

		return {

			type : FETCH_BY_USERID,
			payload : request
		}
}

export function getServiceByFulfillerId(id){

	const url = `${config.SERVICE_DATABASE_URL}/servicesByFulfillerId?id=${id}`

	const request = axios.get(url);

		return {

			type : FETCH_BY_USERID,
			payload : request
		}
}


export function deletePost(id , callback){

	console.log("inside deletePost ACTIONS");
	
	const request = axios.get(`${config.SERVICE_DATABASE_URL}/delete/${id}`).then(()=>{
		callback()
	});

		return {

		type : DELETE_POST,
		payload : id
	}

}

export function deleteComment(commentId,postId,cb){

	console.log("commentId inside deleteComment in ACTION ",commentId);
	console.log("serviceId inside deleteComment in ACTION",postId);

	const url = `${config.SERVICE_DATABASE_URL}/comment?commentId=${commentId}&serviceId=${postId}`;

	// const request = axios.delete(`${url}/${commentId}/${postId}`).then((res)=>{
	// 			console.log('response from axios delete',res);
	// }).catch(error => {
	// 	console.log('error in deleteComment',JSON.stringify(error));
	// });

	$.ajax({
    url: url,
    type: 'GET',
    success: (data) => {
		console.log('success in deleteComment',data);
		cb(data);
      },
    error: (err) =>{
    	console.log('error in deleteComment',JSON.stringify(err));
    }
});

	return {
		type : DELETE_COMMENT , 
		payload : commentId
	}

}

export function updateZip(userId) {

	const url = `${config.PROFILE_URL}?userId=${userId}`

	const request = axios.get(url);

	return {
		type : UPDATE_ZIP,
		payload : request
	}
}

export function updateUserId(userId){

	return {
		type : UPDATE_USERID,
		payload : userId
	}
}

export function updateUserName(userId){

	const url = `${config.PROFILE_URL}?userId=${userId}`

	const request = axios.get(url);

	return {
		type : UPDATE_USERNAME,
		payload : request
	}
}