import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, updateZip , getServiceByUserId , getServiceByFulfillerId} from '../actions/index.js';
import bindActionCreator from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery';



//instead of mapDispatchToProps in connect , we can pass the actioncreator directly too

class PostsIndex extends React.Component{

	constructor(props){
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentDidMount(){

		console.log('in posts index');
		this.props.updateZip()

		this.props.fetchPosts(this.props.zip);
	}

	renderPosts(){	

		return _.map(this.props.posts , post => {

			return (
			// <li key={post.id} className="list-group-item"> 

			<li key={post._id} className="list-group-item">
			<h2>{post.userName} : </h2><Link to={`/posts/${post._id}`}><h3>{post.subject}</h3></Link>
			<i>Status : {post.status}</i>
			</li>
			)
		})
	}

	onGetServiceByUserId(){

		this.props.getServiceByUserId(this.props.userId);
	}

	onGetServiceByFulfillerId(){

		this.props.getServiceByFulfillerId(this.props.userId);
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

			<button className="btn btn-primary" onClick={this.onGetServiceByUserId.bind(this)}> My Services </button>

			<button className="btn btn-primary" onClick={this.onGetServiceByFulfillerId.bind(this)}> My Todos </button>

			</div>

			<ul className="list-group">

			{this.renderPosts()}

			</ul>

			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		posts : state.posts,
		zip : state.zip,
		userName : state.userName,
		userId : state.userId
	}
}


export default connect(mapStateToProps,{fetchPosts : fetchPosts, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(PostsIndex)
