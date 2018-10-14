import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Field, reduxForm } from 'redux-form'; 
import { fetchPost , fetchComments, deletePost , deleteComment } from '../actions/index.js';
import { Link } from 'react-router-dom';
const config = require('../../config.js');
const moment = require('moment');



//ownProps ==== this.props - is exactly same 

class PostsShow extends React.Component{


	constructor(props){

		super(props);

 		this.renderComments = this.renderComments.bind(this);

 		const postId = this.props.match.params;



 	}

	componentDidMount(){

		const { id } = this.props.match.params; //to get the id of the post we want 	

		this.props.fetchComments(id).then(()=>{
			this.props.fetchPost(id);
		})

	}

	onDeleteClick(){

		console.log("inside onDeleteClick to delete POST")

		const { id } = this.props.match.params;
		
		this.props.deletePost(id , ()=>{
			this.props.history.push('/');
		});
	}

	OndeleteComment(){

		console.log("OndeleteComment was Called!!! ");


		var commentId = this.commentId;
		var postId = this.serviceId

		console.log("commentId inside PostsShow",commentId);

		// var postId = this.props.match.params;
		console.log("postId inside postId",postId);

		this.deleteComment(commentId,postId,()=>{
			this.fetchComments(postId).then(()=>{
				this.fetchPost(postId);
			})
		})
		
	}

	renderField(field){
		//should return jsx and 'field' parameter gets it wired to the Field component
		return(
			<div className="form-group">
				<label> {field.label} </label>
				<input className="form-control"
					type="text"
					{...field.input} //request query
				/>
			</div>
			)
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

	onAddComment(values){

		const { id } = this.props.match.params;

		$.ajax({
			url : `${config.SERVICE_DATABASE_URL}/comment`,
			type : 'POST',
			data : {text : values.comment,userId:this.props.userId,userName:this.props.userName,serviceId:this.props.post._id},
			success : (data) => {
				console.log("success in comments POST ", data); 
				values.comment = '';
			},
			error : (err) => {
				console.log("error in Comments", err);
			}
		}).then(()=>{

			this.props.fetchComments(id).then(()=>{
			this.props.fetchPost(id);
		})
		})
	}



    renderComments(){	

    	var comments = this.props.comments;

    	delete comments.undefined;


		return _.map(comments , comment=> {

		var timeFromDb = comment.time; 

		var commentServiceIds = {'commentId':comment._id,'serviceId':this.props.match.params.id , 'deleteComment':this.props.deleteComment,'fetchComments':this.props.fetchComments,'fetchPost':this.props.fetchPost , 'thisInstance':this}

	    return (
	    	<div id={comment._id}>
			<h2>{this.props.userName} <h6><i>{moment(timeFromDb).fromNow()}{(this.props.userId===this.props.post.userId)&& <button className = "btn btn-danger pull-xs-right" onClick={this.OndeleteComment.bind(commentServiceIds)}>Delete</button>}</i></h6> </h2>
			{comment.text}
			</div>
		)
		
		})
	}
	

	render(){

		const { post } = this.props;
		const { id } = this.props.match.params;

		if(!post){
				return <div> Loading..! </div>
			}

		var timeFromDb = post.time; 
		const handleSubmit = this.props.handleSubmit;

		return(

			<div>
			<Link to="/">Back to Feed</Link>
			<button className = "btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete Post </button>
			<h2>{this.props.userName}: </h2><h3>{post.subject}</h3><i>{moment(timeFromDb).fromNow()}</i>
			<p> Content : {post.text}</p>
			<i>Status : {post.status}</i> {this.props.userId!==this.props.post.userId && post.status==="open" && <button type="submit" className="btn btn-success" onClick={this.onOffer.bind(this)}> Fulfill Service</button>}
			{post.status==="pending" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success" onClick={this.onAccept.bind(this)}> Accept Offer?</button>}
			{post.status==="fulfillment In Progress" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success" onClick={this.onFulfill.bind(this)}> Service Completed?</button>}
			<Field name="comment" component={this.renderField}/><button name="comment" type="submit" onClick={handleSubmit(this.onAddComment.bind(this))} className="btn btn-primary"> Add Comment</button>
			{this.renderComments()}
			</div>
			)
	}

}


function mapStateToProps(state, ownProps){
	return {
		post : state.posts[ownProps.match.params._id],
		userId : state.userId,
		userName: state.userName,
		fulfillerId : state.fulfillerId,
		comments : state.comments,
	}
}


//export default connect(mapStateToProps,{ fetchPost , deletePost })(PostsShow);
export default reduxForm({ form : 'PostsCommentsForm' })(
	connect(mapStateToProps,{ fetchPost ,fetchComments, deletePost , deleteComment})(PostsShow)
);
