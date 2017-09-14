import React from 'react'
import axios from 'axios'

export default class Kazs extends React.Component {
	constructor(){
		super()
		this.state = {
			name: []
		}
  		console.log('can you hear me');
	}
	componentDidMount(){
		console.log("test")
		axios.get('/kazs')
			// .then((result)=> console.log("I hit the /kazs route!", result))
			.then((res)=>this.setState({name:res.data}))
			// .then((newState)=> console.log('i want to see something', this.state))
			.catch(err => console.log('Uncaught?', err.message))
	}
	render(){
		const { name } = this.state;
		return(
			<div>
				<ul>
					
						{
							name.map(n => <li key={n.id}>{n.name}</li>)
						}
					
				</ul>
			</div>
			)
	}
}