import _ from 'lodash';

import { UPDATE_USERID } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state="0000",action){

	switch(action.type){

		case UPDATE_USERID : 
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload; // {userid , subject , zipcode , message}
			console.log("result in reducer_userId",result);
			return result;

	}

	return state
}