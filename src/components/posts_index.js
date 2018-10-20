import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchHealth, updateZip , updateCity,updateState, updateUserId, updateUserName, updateLastName, getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Doughnut} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';



const moment = require('moment');

const drawerWidth = 240;

const styles = theme => ({
  	snackbar: {
    	margin: theme.spacing.unit,
  			},

  	root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3 + 45,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
    menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
	});

class PostsIndex extends React.Component{

  	constructor(props){
		
		super(props);

		this.state= {
 			
 			userId: this.props.userId || this.props.location.search.slice(8),
    		anchorEl: null,
    		anchor: 'left'
  
 		}

 		this.renderPosts = this.renderPosts.bind(this);
 		this.handleClick = this.handleClick.bind(this);
 		this.handleClose = this.handleClose.bind(this);

 	}

 	componentDidMount(){


 		console.log("userid in cdm",this.state.userId)



 		this.props.updateUserId(this.state.userId);
		
 		this.props.updateZip(this.state.userId).then(()=>{

 			this.props.updateCity(this.state.userId);
 			this.props.updateState(this.state.userId);
 			this.props.updateLastName(this.state.userId);
 			this.props.updateUserName(this.state.userId).then(()=>{ 

 				this.props.fetchPosts(this.props.zip); 
 		
 			});
		
    	});
 		}


    handleClick (event){
    	
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
	 	<Paper>
	 	    <Typography variant="h4" color="#ad9c78">
            {this.props.city?this.props.city+', ':'' }{this.props.userState?this.props.userState:'' } {this.props.zip} 
          </Typography>
      <MenuList>
        <MenuItem className={this.props.classes.menuItem}>
        <ListItem><Link to="/posts/new">Add New Request</Link></ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem}>
			<ListItem button onClick={this.onClickingHome.bind(this)}>Feed</ListItem>        </MenuItem>
        <MenuItem className={this.props.classes.menuItem}>
        	<ListItem button onClick={this.onGetServiceByUserId.bind(this)}>My Needs</ListItem>
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem}>
			<ListItem button onClick={this.onGetServiceByFulfillerId.bind(this)}>My Todos</ListItem>  
		</MenuItem>      
		<MenuItem className={this.props.classes.menuItem}>
			<ListItem><Link to="/health"> Health </Link></ListItem>
        </MenuItem>
      </MenuList>
    </Paper>
     <main className={this.props.classes.content}>
	<div>
		{this.renderPosts()}
	</div>
	</main>
	</div>
		)
	}
};

function mapStateToProps(state){
	return {
		posts : state.posts,
		zip : state.zip,
		city: state.city,
		userState : state.userState,
		userName : state.userName,
		userId : state.userId,
		lastName : state.lastName,
		statusCount:state.statusCount
	}
}

PostsIndex.propTypes = {
  classes: PropTypes.object
};


export default connect(mapStateToProps, {fetchPosts : fetchPosts, fetchHealth:fetchHealth, updateUserName:updateUserName, updateLastName:updateLastName,updateUserId:updateUserId, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip , updateCity:updateCity , updateState:updateState})(withStyles(styles)(PostsIndex));


