import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, updateZip , updateUserId, updateUserName, getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
import bindActionCreator from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AddIcon from '@material-ui/icons/Add';


const moment = require('moment');


const styles = theme => ({
  	snackbar: {
    	margin: theme.spacing.unit,
  			},
	});

class PostsIndex extends React.Component{

  	constructor(props){
		super(props);

 		this.renderPosts = this.renderPosts.bind(this);

 		var query = this.props.location.search; //""

 		var uId = query.slice(8);

 		console.log("this.props",this.props);

 		this.state= {
 			userID : uId
 		}

 	}

 	componentDidMount(){

 	console.log("userid in cdm",this.state.userID)

 	if(this.state.userID){


 		this.props.updateUserId(this.state.userID);
		
 		this.props.updateZip(this.state.userID).then(()=>{

 			this.props.updateUserName(this.state.userID).then(()=>{ 

 				this.props.fetchPosts(this.props.zip); 
 	
 			});
		
    	});
 
 	}	
 	else{

 		this.props.updateUserId(this.props.userId);
		
 		this.props.updateZip(this.props.userId).then(()=>{

 			this.props.updateUserName(this.props.userId).then(()=>{ 

 				this.props.fetchPosts(this.props.zip); 
 	
 			});
		
    	});

  //  	this.props.history.push("/");
 	// }




  }
 }

    renderPosts(){	

    	if(this.props.post===null){
			return(
				<p>"Add a service request!"</p>
				)
		}

		return _.map(this.props.posts , post => {

		var timeFromDb = post.time; 

	    return (
	    <div>
      	<SnackbarContent
      	className={this.props.classes.snackbar}
        message = {
        	<div id={post.subject}>
			<h2>{post.userName} {post.lastName?post.lastName:''}<h6><i>{moment(timeFromDb).fromNow()}</i></h6> </h2><Link to={`/posts/${post._id}`}><h3>{post.subject}</h3></Link>
			<i>Status : {post.status}  {post.status!==open && post.fulfillerName!==null && 'by '+ post.fulfillerName}</i><p style={{marginRight: 2.5 + 'em'}}><Link to={`/posts/${post._id}`}><i className="material-icons">chat_bubble_outline</i></Link>  {post.commentCount} comments  </p>
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

			<Link to="/posts/new">

			<Button variant="fab" color="secondary" aria-label="Add" className={this.props.classes.button}>
            
            <AddIcon />
            
            </Button>

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


export default connect(mapStateToProps, {fetchPosts : fetchPosts, updateUserName:updateUserName,updateUserId:updateUserId, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(withStyles(styles)(PostsIndex));


