import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // since reducer is too common a name we are giving it an alias - formReducer
import PostsReducer from './reducer_posts.js';
import zipReducer from './reducer_zip.js';


const rootReducer = combineReducers({
  posts : PostsReducer,
  form  : formReducer,
  zip : zipReducer
});

export default rootReducer;
