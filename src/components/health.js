import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';


class Health extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {
	
		console.log(this.refs.chart.chartInstance); // returns a Chart.js instance reference
}

	render(){

		var openPosts =  _.filter(this.props.posts , post =>{

			return post.status === "open";
		}).length;

		var offeredPosts =  _.filter(this.props.posts , post =>{

			return post.status === "Offered";
		}).length;

		var inProgressPosts =  _.filter(this.props.posts , post =>{

			return post.status === "Fulfillment In Progress";
		}).length;

		var completedPosts =  _.filter(this.props.posts , post =>{

			return post.status === "Completed";
		}).length;

		// var healthObj = {"open":openPosts,"offered":offeredPosts,"inProgress":inProgressPosts}

	var colors = ['#ff6384','#36a2eb','#cc65fe','#ffce56']
	var data= {
       labels: ["Open","Offered","Fulfillment in Progress","Completed"],
       datasets: [{
       label: "My First dataset",
       // backgroundColor: 'rgb(255, 99, 132)',
       backgroundColor : colors,
       borderColor: 'rgb(255, 99, 132)',
       data:[openPosts,offeredPosts,inProgressPosts,completedPosts],
       // data:[10,15,20,30],
       }]
   }



	return (

		<div>
		<Link to="/"><Button variant="contained" color="primary">
			 Back to Feed
     	</Button></Link>
     	<Typography variant="h5" component="h3">Service Request Statuses for Zipcode : {this.props.zip}</Typography>
     	<div>
   		<Doughnut ref='chart' data={data} />
   		</div>
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


export default connect(mapStateToProps, null)(Health);
