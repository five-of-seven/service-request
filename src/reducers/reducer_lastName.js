import _ from 'lodash';

import { UPDATE_LASTNAME } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state="",action){

	switch(action.type){

		case UPDATE_LASTNAME : 
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload.data; // {city,email,karma,firstname,lastname,street,userid,userState,zipcode,_id}
			var lname = result.lastName;

			return lname;

	}

	return state
}