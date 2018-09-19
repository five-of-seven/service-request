import React from 'react';
import { connect } from 'react-redux';
import { fetchPost , deletePost } from '../actions/index.js';
import { Link } from 'react-router-dom';


//ownProps ==== this.props - is exactly same 

class PostsShow extends React.Component{

	componentDidMount(){

		const { id } = this.props.match.params; //to get the id of the post we want 	
		this.props.fetchPost(id);
	}

	onDeleteClick(){

		const { id } = this.props.match.params;
		
		this.props.deletePost(id , ()=>{
			this.props.history.push('/');
		});
	}

	render(){

		const { post } = this.props;

		console.log("in posts show");

		if(!post){
				return <div> Loading..! </div>
			}

		return(
			<div>
			<Link to="/">Back to Feed</Link>
			<button className = "btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete Post </button>
			<h2>Pooja : </h2><h3>{post.subject}</h3>
			<p> Content : {post.text}</p>
			<p>{post.text}</p> 
			<i>Status : {post.status}</i> {post.status==="open" && <button type="submit" className="btn btn-success"> Fulfill Service</button>}
			</div>

			)
	}

}


function mapStateToProps({ posts }, ownProps){
	return {
		post : posts[ownProps.match.params._id]
	}
}

export default connect(mapStateToProps,{ fetchPost , deletePost })(PostsShow);

