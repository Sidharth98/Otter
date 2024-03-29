import React, {Component} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from'react-router-dom';
import '../App.css';
import firebase from '../../firebase';


class Login extends Component {

state = {
	
	email: '',
	password: '',
	errors: [],
	loading: false
	

};

displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

handleChange = (event) => {
	this.setState({[event.target.name] :event.target.value});
}


handleSubmit = (event) => {
	event.preventDefault();

	if(this.isFormValid(this.state)) {
		this.setState({errors:[], loading: true})
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(signedInUser => {
				console.log(signedInUser)
			})	
			.catch(err => {
				console.log(err);
				this.setState({
					errors: this.state.errors.concat(err),
					loading: false
				});

			});
}
}

isFormValid = ({email,password}) => email && password;


 render() {

	const {email, password, errors, loading} = this.state;

	return(

		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{maxWidth: 450}} >
				<Header as="h1" icon color="violet" 
					textAlign="center">
					<Icon name="code branch" 
						color="violet" />
					Login to OTTER
				</Header>
			<Form size="large" onSubmit={this.handleSubmit}>
				<Segment stacked>
					

					<Form.Input 
					fluid name="email" 
					icon="user" 
					iconPosition="left"
					placeholder="Email Address" 
					value={email}
					className={
						errors.some(error => 
							error.message.toLowerCase().includes("email")
							)	
								? "error"
								: ""


					}
					onChange={this.handleChange} 
					type="email"/>

					<Form.Input 
					fluid name="password" 
					icon="lock" iconPosition="left"
					placeholder="Password" 
					value={password}
					onChange={this.handleChange} 
					type="password"/>

					

					<Button
					disabled={loading}
					className={loading ? 'loading' : ''} 
					color="violet" 
					fluid size="large">
					Submit
					</Button>
				</Segment>
			</Form>	
			{this.state.errors.length > 0 && (

				<Message error>
					<h3>Error</h3>
					{this.displayErrors(this.state.errors)}											}	
				</Message>	
				)}	

			<Message>Don't have an account? <Link to="/register">Register</Link></Message>
			</Grid.Column>
		</Grid>

			);
	}
}

export default Login;