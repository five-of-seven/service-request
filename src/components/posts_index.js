import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index.js';
import bindActionCreator from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

//instead of mapDispatchToProps in connect , we can pass the actioncreator directly too

class PostsIndex extends React.Component{

	constructor(props){
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentDidMount(){

		this.props.fetchPosts();
	}

	renderPosts(){	

		return _.map(this.props.posts , post => {

			return (
			<li key={post.id} className="list-group-item"> 
			
			<h3>{post.title}</h3>
			<h6>Categories : {post.categories}</h6>
			<p> Content : {post.content}</p>
			
			</li>
			)
		})
	}

	render(){
		return(
			<div> 

			<div className="text-xs-right">

			<Link className="btn btn-primary" to="/posts/new">

			Add a Post

			</Link>

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
		posts : state.posts
	}
}


export default connect(mapStateToProps,{fetchPosts : fetchPosts})(PostsIndex)
