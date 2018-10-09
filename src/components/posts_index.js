import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, updateZip ,updateUserName, getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
import bindActionCreator from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const moment = require('moment');

// const styles = theme => ({
//   snackbar: {
//     margin: theme.spacing.unit,
//     backgroundColor: green[600],
//   },
// });

class PostsIndex extends React.Component{

  	constructor(props){
		super(props);

 		this.renderPosts = this.renderPosts.bind(this);

 	}

 	componentDidMount(){
		
 	this.props.updateZip().then(()=>{

 	this.props.updateUserName().then(()=>{ 

 	this.props.fetchPosts(this.props.zip); 
 	
 	});
		
    });

     }

    renderPosts(){	

    	// var classes = this.props.styles;

		return _.map(this.props.posts , post => {

		var timeFromDb = post.time; 

	    return (
	    <div>
      	<SnackbarContent
      	// className={classes.snackbar}
        message = {
        	<div id={post.subject}>
			<h2>{this.props.userName} <h6><i>{moment(timeFromDb).fromNow()}</i></h6> </h2><Link to={`/posts/${post._id}`}><h3>{post.subject}</h3></Link>
			<i>Status : {post.status}</i>
			</div>
		     }
		 />
    	</div>
		)
		
		})
	}

	onGetServiceByUserId(){

		this.props.getServiceByUserId(this.props.userId);
	}

	onGetServiceByFulfillerId(){

		this.props.getServiceByFulfillerId(this.props.userId);
	}

	onClickingHome(){

		this.props.fetchPosts(this.props.zip);
	}

	render(){
		return(
			<div> 

			<div className="text-xs-right">

			<Link className="btn btn-primary" to="/posts/new">

			Add a Post

			</Link>

			</div>

			<div className="text-xs-left">

			<button className="btn btn-primary" onClick={this.onClickingHome.bind(this)}> Home </button>

			<button className="btn btn-primary" onClick={this.onGetServiceByUserId.bind(this)}> My Services </button>

			<button className="btn btn-primary" onClick={this.onGetServiceByFulfillerId.bind(this)}> My Todos </button>

			</div>

			{this.renderPosts()}

			</div>
			)
	}
};

function mapStateToProps(state){
	return {
		posts : state.posts,
		zip : state.zip,
		userName : state.userName,
		userId : state.userId
	}
}

PostsIndex.propTypes = {
  classes: PropTypes.object
};


export default connect(mapStateToProps,{fetchPosts : fetchPosts, updateUserName:updateUserName, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(PostsIndex)


// export default withStyles(styles)(PostsIndex);
// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchPosts, updateZip ,updateUserName, getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
// import bindActionCreator from 'redux';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';
// import axios from 'axios';
// import $ from 'jquery';
// const moment = require('moment');




// //instead of mapDispatchToProps in connect , we can pass the actioncreator directly too

// class PostsIndex extends React.Component{

// 	constructor(props){
// 		super(props);

// 		this.renderPosts = this.renderPosts.bind(this);
// 	}

// 	componentDidMount(){
		
// 	this.props.updateZip().then(()=>{

// 		this.props.updateUserName().then(()=>{ 

// 			console.log("this.props.userName",this.props.userName);
// 			this.props.fetchPosts(this.props.zip); 
// 		});
		
// });
		

// 	}

// 	renderPosts(){	


// 		return _.map(this.props.posts , post => {

// 			var timeFromDb = post.time; 

// 			return (
// 			<li key={post._id} className="list-group-item">
// 			<h2>{this.props.userName} <h6><i>{moment(timeFromDb).fromNow()}</i></h6> </h2><Link to={`/posts/${post._id}`}><h3>{post.subject}</h3></Link>
// 			<i>Status : {post.status}</i>
// 			</li>
// 			)
// 		})
// 	}

// 	onGetServiceByUserId(){

// 		this.props.getServiceByUserId(this.props.userId);
// 	}

// 	onGetServiceByFulfillerId(){

// 		this.props.getServiceByFulfillerId(this.props.userId);
// 	}

// 	onClickingHome(){

// 		this.props.fetchPosts(this.props.zip);
// 	}


// 	render(){
// 		return(
// 			<div> 

// 			<div className="text-xs-right">

// 			<Link className="btn btn-primary" to="/posts/new">

// 			Add a Post

// 			</Link>

// 			</div>

// 			<div className="text-xs-left">

// 			<button className="btn btn-primary" onClick={this.onClickingHome.bind(this)}> Home </button>

// 			<button className="btn btn-primary" onClick={this.onGetServiceByUserId.bind(this)}> My Services </button>

// 			<button className="btn btn-primary" onClick={this.onGetServiceByFulfillerId.bind(this)}> My Todos </button>

// 			</div>

// 			<ul className="list-group">

// 			{this.renderPosts()}

// 			</ul>

// 			</div>
// 			)
// 	}
// }

// function mapStateToProps(state){
// 	return {
// 		posts : state.posts,
// 		zip : state.zip,
// 		userName : state.userName,
// 		userId : state.userId
// 	}
// }


// export default connect(mapStateToProps,{fetchPosts : fetchPosts, updateUserName:updateUserName, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(PostsIndex)
