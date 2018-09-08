import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // since reducer is too common a name we are giving it an alias - formReducer
import PostsReducer from './reducer_posts.js';


const rootReducer = combineReducers({
  posts : PostsReducer,
  form  : formReducer
});

export default rootReducer;
