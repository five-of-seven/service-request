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
					name="title"
					label="Title"
					component={this.renderField}
				/>
				<Field
					name="categories"
					label="Categories"
					component={this.renderField}
				/>

				<Field
					name="content"
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


export default reduxForm({ form : 'PostsNewForm' })(
	connect(null,{ createPost })(PostsNew)
);