import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // since reducer is too common a name we are giving it an alias - formReducer
import PostsReducer from './reducer_posts.js';
import zipReducer from './reducer_zip.js';
import userIdReducer from './reducer_userId.js';
import userNameReducer from './reducer_userName.js';


const rootReducer = combineReducers({
  posts : PostsReducer,
  comments : PostsReducer,
  form  : formReducer,
  zip : zipReducer,
  userId : userIdReducer,
  fulfillerId : userIdReducer,
  userName : userNameReducer,
  value : 0
});

export default rootReducer;
