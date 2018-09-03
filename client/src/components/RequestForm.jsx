import React from 'react'
import { Form , TextArea, Button } from 'semantic-ui-react'

class RequestForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      
      Subject: '',
      Message:''
    };

    this.handleChange = this.handleChange.bind(this)
  }

    handleChange(event) {
    
    if(event.target.name==='Message'){
      this.setState({Message: event.target.value})
    }
    else{
      this.setState({Subject: event.target.value})
    }
  }

  render(){
    return(
  
  <form action="/newreq" method="post">
    <Form.Field>
      <label>Subject</label>
      <br/>
      <input type="text" name="Subject" placeholder='Subject' value={this.state.Subject} onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Request Message : </label>
      <br/>
      <textarea placeholder='Tell us more ...' name="Message" value={this.state.Message} onChange={this.handleChange} />
    </Form.Field>
    <button type='submit'>Submit</button>
  </form>
    )
  }
}


export default RequestForm;




