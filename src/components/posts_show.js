import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Field, reduxForm } from 'redux-form'; 
import { fetchPost , fetchComments, deletePost , deleteComment } from '../actions/index.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SnackbarContent from '@material-ui/core/SnackbarContent';
const config = require('../../config.js');
const moment = require('moment');


const styles = theme => ({
  root: {

    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
    maxWidth: 800,
    // padding: theme.spacing.unit * 2,
  },
    snackbar: {
    	margin: theme.spacing.unit,
  			},
   button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

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
      url: `${config.SERVICE_DATABASE_URL}/service/${post._id}?fulfillerName=${this.props.userName}&fulfillerId=${this.props.userId}&status=Offered`, 
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
      url: `${config.SERVICE_DATABASE_URL}/service/${post._id}?status=Fulfillment In Progress`, 
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
      	<Paper className={this.props.classes.root} elevation={1}>
      	<Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={16}>
        <Grid item xs>
        <Typography variant="h5" component="h3">
          {comment.userName}
        </Typography>
        <Typography color="textSecondary">{moment(timeFromDb).fromNow()}</Typography>
        <Typography gutterBottom variant="subtitle1">
          {comment.text}
        </Typography>
        </Grid>
        </Grid>
        <Grid item>
         <Typography variant="subtitle1">

         {(this.props.userId===comment.userId)&& <IconButton aria-label="Delete" className={this.props.classes.button} onClick={this.OndeleteComment.bind(commentServiceIds)}>
          <DeleteIcon />
        </IconButton>}
        </Typography>
        </Grid>
        </Grid>
      	</Paper>
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
			<Link to="/"><Button variant="contained" color="primary" className={this.props.classes.button}>
			 Back to Feed
       		 <Icon className={this.props.classes.leftIcon}></Icon>
     		 </Button></Link>
     		 {this.props.userId===post.userId && <Button variant="contained" color="secondary" className={this.props.classes.button} onClick={this.onDeleteClick.bind(this)}>
        	 Delete Post
             <DeleteIcon className={this.props.classes.rightIcon} />
             </Button>}
            <Grid item xs={12} sm container>
         	<Grid item xs container direction="column" spacing={16}>
        	<Grid item xs>
            <SnackbarContent
      		className={this.props.classes.snackbar}
        	message = {
        		<div>
               <h4>{post.userName} {post.lastName?post.lastName:''}</h4>
            <i>{moment(timeFromDb).fromNow()}</i>
            <h3>{post.subject}</h3>
            <p>{post.text}</p>
            <i>Status : {post.status} by {post.fulfillerName}</i> {this.props.userId!==this.props.post.userId && post.status==="open" && <button type="submit" className="btn btn-success pull-xs-right" onClick={this.onOffer.bind(this)}>Offer to fulfill Service</button>}
            {post.status==="Offered" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success pull-xs-right" onClick={this.onAccept.bind(this)}> Accept Offer?</button>}
            {post.status==="Fulfillment In Progress" && this.props.userId===this.props.post.userId && <button type="submit" className="btn btn-success pull-xs-right" onClick={this.onFulfill.bind(this)}> Mark Service Completed</button>}
            	</div>
            }/>
            </Grid>
            </Grid>
            </Grid>
			{this.renderComments()}
			<Field name="comment" component={this.renderField}/>
            <button name="comment" type="submit" onClick={handleSubmit(this.onAddComment.bind(this))} className="btn btn-primary"> Add Comment</button>
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

PostsShow.propTypes = {
  classes: PropTypes.object.isRequired,
};


//export default connect(mapStateToProps,{ fetchPost , deletePost })(PostsShow);
export default reduxForm({ form : 'PostsCommentsForm' })(
	connect(mapStateToProps,{ fetchPost ,fetchComments, deletePost , deleteComment})(withStyles(styles)(PostsShow))
);

//export default connect(mapStateToProps,{ fetchPost ,fetchComments, deletePost , deleteComment })(reduxForm({ form : 'PostsCommentsForm' })withStyles(styles)((PostsShow)));
//export default connect(mapStateToProps, {fetchPosts : fetchPosts, updateUserName:updateUserName,updateUserId:updateUserId, getServiceByUserId:getServiceByUserId, getServiceByFulfillerId:getServiceByFulfillerId, updateZip:updateZip})(withStyles(styles)(PostsIndex));

