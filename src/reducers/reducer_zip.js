import _ from 'lodash';

import { UPDATE_ZIP } from '../actions/index.js';

export default function(state="",action){

	switch(action.type){

		case UPDATE_ZIP : 
			//action.payload.data will return an array of objects --> which we have to convert to object of objects
			//so we use lodash --> _.mapKeys(array,key)
			var result = action.payload.data; // {city,email,karma,firstname,lastname,street,userid,userState,zipcode,_id}
			console.log("result in reducer_zip",result)
			var zip = result.zipCode;
			console.log("zip in reducer_zip",zip);
			return zip;		

	}

	return state
}