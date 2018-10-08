import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { fetchPost , deletePost } from '../actions/index.js';
import { Link } from 'react-router-dom';
const config = require('../../config.js');
const moment = require('moment');


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

	onOffer(){

	  const { post } = this.props;

	  $.ajax({
      url: `${config.SERVICE_DATABASE_URL}/service/${post._id}?fulfillerName=${this.props.userName}&fulfillerId=${this.props.userId}&status=pending`, 
      type:'GET',
      success: (data) => {

        console.log('success in onOffer',data);
        this.props.history.push('/');
      },
      error: (err) => {
        console.log('error in onOffer', err);
      		}
    	});
	}


	onAccept(){
		const { post } = this.props;

	  $.ajax({
      url: `${config.SERVICE_DATABASE_URL}/service/${post._id}?status=fulfillment In Progress`, 
      type:'GET',
      success: (data) => {

        console.log('success in onAccept',data);
        this.props.history.push('/');
      },
      error: (err) => {
        console.log('error in onAccept', err);
      		}
    	});
	 }

	 onFulfill(){
	 
	 const { post } = this.props;

	 $.ajax({
      url: `${config.SERVICE_DATABASE_URL}/service/${post._id}?status=Completed`, 
      type:'GET',
      success: (data) => {

        console.log('success in onFulfill',data);
        this.props.history.push('/');
      },
      error: (err) => {
        console.log('error in onFulfill', err);
      		}
    	});


	$.ajax({
      url: `${config.KARMA_POINTS_URL}?id=${post.fulfillerId}`, 
      type:'GET',
      success: (data) => {

        console.log('success in adding Karma Point',data);
        this.props.history.push('/');
      },
      error: (err) => {
        console.log('error in Karma Points', err);
      		}
    	});
	 }
	

	render(){

		const { post } = this.props;
	

		if(!post){
				return <div> Loading..! </div>
			}

		var timeFromDb = post.time; 

		return(
			<div>
			<Link to="/">Back to Feed</Link>
			<button className = "btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete Post </button>
			<h2>{this.props.userName}: </h2><h3>{post.subject}</h3><i>{moment(timeFromDb).fromNow()}</i>
			<p> Content : {post.text}</p>
			<i>Status : {post.status}</i> {this.props.userId!==this.props.post.userId && post.status==="open" && <button type="submit" className="btn btn-success" onClick={this.onOffer.bind(this)}> Fulfill Service</button>}
			{post.status==="pending" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success" onClick={this.onAccept.bind(this)}> Accept Offer?</button>}
			{post.status==="fulfillment In Progress" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success" onClick={this.onFulfill.bind(this)}> Service Completed?</button>}
			</div>

			)
	}

}


function mapStateToProps(state, ownProps){
	return {
		post : state.posts[ownProps.match.params._id],
		userId : state.userId,
		userName: state.userName,
		fulfillerId : state.fulfillerId
	}
}


export default connect(mapStateToProps,{ fetchPost , deletePost })(PostsShow);

