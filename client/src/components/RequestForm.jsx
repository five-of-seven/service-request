import React from 'react';
import ReactDOM from 'react-dom';

class RequestForm extends React.Component{

	constructor(props){

	super(props);
    
    this.state = {
      
      Subject: '',
      Message:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
  	
  	if(event.target.name==='Message'){
    	this.setState({Message: event.target.value})
    }
    else{
    	this.setState({Subject: event.target.value})
    }
  }

  handleSubmit(event) {
  	console.log(event);
    event.preventDefault();
  }

	render(){

		return(

			<div>

			<form action="/newreq" method="post">
  			
  			<label>
    		Subject:
    		<input type="text" name="Subject" value={this.state.Subject} onChange={this.handleChange} />
  			</label>
  			
  			<hr/>

  			<label>
  			Message:
           <textarea name="Message" value={this.state.message} onChange={this.handleChange} />
  			</label>

  			<button type="submit">Submit</button>

			</form>
			
			</div>

			)
	}
}


export default RequestForm;