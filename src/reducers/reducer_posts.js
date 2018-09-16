import _ from 'lodash';

import { FETCH_POSTS , FETCH_POST } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state={},action){

	switch(action.type){

		case FETCH_POST : 
			
			const post = action.payload.data;

			const newState= { ...state }

			newState[post.id] = post;

			return newState;

		case FETCH_POSTS : 
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload.data;
			var reverse = result.reverse();
			console.log('action.payload.data',reverse);
			return _.mapKeys(reverse,'_id');

	}

	return state
}