import _ from 'lodash';

import { UPDATE_CITY } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state="",action){

	switch(action.type){

		case UPDATE_CITY :

			var result = action.payload.data ;
			console.log("result in reducer_zip",result)
			var city = result.city;
			console.log("city in reducer_zip",city);
			return city;			

	}

	return state
}