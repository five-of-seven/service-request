import _ from 'lodash';

import { UPDATE_USERNAME } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state="pooja",action){

	switch(action.type){

		case UPDATE_USERNAME : 
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload.data; // {city,email,karma,firstname,lastname,street,userid,userState,zipcode,_id}

			var fname = result.firstName;

			return fname;

	}

	return state
}