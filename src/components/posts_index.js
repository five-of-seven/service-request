import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, updateZip} from '../actions/index.js';
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
		this.props.updateZip()

		this.props.fetchPosts(this.props.zip);
	}

	renderPosts(){	

		return _.map(this.props.posts , post => {

			return (
			// <li key={post.id} className="list-group-item"> 

			<li key={post._id} className="list-group-item">
			<h2>Pooja : </h2>
			<h3>{post.subject}</h3>
			<p>{post.text}</p> 
			<i>Status : {post.status}</i>   <button type="submit" className="btn btn-success"> Fulfill Service</button>
			
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
		posts : state.posts,
		zip : state.zip
	}
}


export default connect(mapStateToProps,{fetchPosts : fetchPosts, updateZip:updateZip})(PostsIndex)
