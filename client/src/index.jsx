import React from 'react';
import ReactDOM from 'react-dom';
import RequestForm from './components/RequestForm.jsx';

class App extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(

		<div>

		<RequestForm />

		</div>
		
		)
	}

}


ReactDOM.render(<App/>,document.getElementById("app"))
