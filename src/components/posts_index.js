import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, updateZip , updateUserId, updateUserName, updateLastName, getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const moment = require('moment');


const styles = theme => ({
  	snackbar: {
    	margin: theme.spacing.unit,
  			},

  	 root: {
    	flexGrow: 1,
  },
	});

class PostsIndex extends React.Component{

  	constructor(props){
		
		super(props);

		this.state= {
 			
 			userId: this.props.userId || this.props.location.search.slice(8),
    		anchorEl: null
  
 		}

 		this.renderPosts = this.renderPosts.bind(this);
 		this.handleClick = this.handleClick.bind(this);
 		this.handleClose = this.handleClose.bind(this);

 	}

 	componentDidMount(){

 		var that = this;

 		console.log("userid in cdm",this.state.userId)



 		this.props.updateUserId(this.state.userId);
		
 		this.props.updateZip(this.state.userId).then(()=>{

 			this.props.updateLastName(this.state.userId);
 			this.props.updateUserName(this.state.userId).then(()=>{ 

 				this.props.fetchPosts(this.props.zip); 
 	
 			});
		
    	});
 		}


    handleClick (event){
    	
    	console.log("this in handleClick",this);
    	this.setState({ anchorEl: event.currentTarget });
    	// this.state.anchorEl = event.currentTarget;
  	};

  	handleClose (){
    	
    	this.setState({ anchorEl: null });
  	};

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
		
		const { anchorEl } = this.state;

		return(
			<div className={this.props.classes.root}> 
			
			<Grid container spacing={24}>
        	
        	<Grid item xs>

			<Typography variant="h5" component="h3"><Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}> Open Menu </Button></Typography>

			<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
 				
 				<MenuItem><Link to="/posts/new">Add Post</Link></MenuItem>
 				<MenuItem onClick={this.onClickingHome.bind(this)}>Feed</MenuItem>
          		<MenuItem onClick={this.onGetServiceByUserId.bind(this)}>My Services</MenuItem>
          		<MenuItem onClick={this.onGetServiceByFulfillerId.bind(this)}>My Todos</MenuItem>
        	
        	</Menu>

        	</Grid>

			<Grid item xs={9}>

			{this.renderPosts()}

			</Grid>

			</Grid>

			</div>
			
		)
	}
};

function mapStateToProps(state){
	return {
		posts : state.posts,
		zip : state.zip,
		userName : state.userName,
		userId : state.userId,
		lastName : state.lastName
	}
}

PostsIndex.propTypes = {
  classes: PropTypes.object
};


export default connect(mapStateToProps, {fetchPosts : fetchPosts, updateUserName:updateUserName, updateLastName:updateLastName,updateUserId:updateUserId, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(withStyles(styles)(PostsIndex));


