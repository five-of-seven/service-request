import _ from 'lodash';

import { UPDATE_STATE } from '../actions/index.js'; //importing the variable NOT THE FUNCTION

export default function(state="",action){

	switch(action.type){

		case UPDATE_STATE :

			var result = action.payload.data ;
			var userState = result.userState;
			return userState;			

	}

	return state
}