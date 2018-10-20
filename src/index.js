import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';

import { BrowserRouter , Route , Switch } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index.js';
import PostsNew from './components/posts_new.js';
import PostsShow from './components/posts_show.js';
import rootReducer from './reducers/index.js';

import myTheme from './ui/theme/index';
import { MuiThemeProvider } from '@material-ui/core/styles';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(promise)
  ));

console.log("rootReducer",rootReducer);
console.log("store.getState",store.getState())
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <MuiThemeProvider theme={myTheme}>
    	<div>
    	<Switch>
    	<Route path="/posts/new" component = {PostsNew} />
      <Route path="/posts/:id" component = {PostsShow}/>
      <Route path="/" component={PostsIndex}/>
    	</Switch>
    	</div>
    </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
