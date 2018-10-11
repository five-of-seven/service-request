import _ from 'lodash';

import { FETCH_POSTS , FETCH_COMMENTS, FETCH_POST , FETCH_BY_USERID} from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state={},action){

	switch(action.type){

		case FETCH_POST : 
			
			const post = action.payload.data;

			const newState= { ...state }

			newState[post.id] = post;

			return newState;

		case FETCH_POSTS : //newsfeed
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload.data;
			// var reverse = result.reverse();
			// console.log('action.payload.data',reverse);			
			return _.mapKeys(result,'_id');

		case FETCH_COMMENTS : 

			var result = action.payload.data;

			console.log("Result in FETCH_COMMENTS reducer",result);

			 return _.mapKeys(result,'_id'); 


		case FETCH_BY_USERID : 

			var result = action.payload.data;

			return _.mapKeys(result,'_id');

	}

	return state
}