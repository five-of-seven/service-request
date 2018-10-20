import React from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm is very similiar to connect 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index.js';

class PostsNew extends React.Component {


	renderField(field){
		//should return jsx and 'field' parameter gets it wired to the Field component
		return(
			<div className="form-group">
				<label> {field.label} </label>
				<input className="form-control"
					type="text"
					{...field.input} 
				/>
			</div>
			)
	}

	onSubmit(values){
		// var data = {'userId': '100','zip': 0000, 'subject': values.title, 'text': values.content }
		// console.log('data',data)
		values["zip"] = this.props.zip;
		values["userId"] = this.props.userId;
		values["userName"] = this.props.userName;
		values["lastName"] = this.props.lastName;
		
		console.log('values',values);
		this.props.createPost(values,()=>{
			this.props.history.push('/'); 
		});	
	}

	render(){
		const { handleSubmit } = this.props;
		return(
			<div> 
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="subject"
					label="Subject"
					component={this.renderField}
				/>

				<Field
					name="text"
					label="Post Content"
					component={this.renderField}
				/>

				<button type="submit" className="btn btn-primary"> Submit </button>
				<Link to="/" className="btn btn-danger"> Cancel </Link>
			</form>

			</div>

			)
	}
}

function mapStateToProps(state){
	return {
		zip : state.zip,
		userId : state.userId,
		userName : state.userName,
		lastName : state.lastName
	}
}

export default reduxForm({ form : 'PostsNewForm' })(
	connect(mapStateToProps,{ createPost })(PostsNew)
);