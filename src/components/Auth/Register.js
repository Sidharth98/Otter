import React, {Component} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from'react-router-dom';
import '../App.css';
import firebase from '../../firebase';
import md5 from 'md5';

class Register extends Component {

state = {
	username: '',
	email: '',
	password: '',
	passwordConfirmation: '',
	errors: [],
	loading: false,
	usersRef: firebase.database().ref('users')

};

isFormValid = () => {

	let errors = [];
	let error;

	if(this.isFormEmpty(this.state)) {
		error={message: 'Fill in all Fields' };
		this.setState({errors: errors.concat(error) });
		return false;		
	} else if(!this.isPasswordValid(this.state)) {
		error = {message: 'Password is invalid'}
		this.setState({errors: errors.concat(error)});
		return false;
	} else {
		return true;
	}
}

isFormEmpty = ({username, email, password, passwordConfirmation}) => {
	return !username.length || !email.length || !password.length ||
	!passwordConfirmation.length;

}


displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);



isPasswordValid = ({password, passwordConfirmation}) => {
	if(password.length<6 || passwordConfirmation.length < 6) {
		return false;
	} else if(password !== passwordConfirmation) {
		return false;
	} else {
		return true;
	}	
		
	
}



handleChange = (event) => {
	this.setState({[event.target.name] :event.target.value});
}


handleSubmit = (event) => {
	event.preventDefault();

	if(this.isFormValid()) {
		this.setState({errors:[], loading: true})
	firebase
		.auth()
		.createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then(createdUser => {
			console.log(createdUser);
			createdUser.user.updateProfile({
				displayName: this.state.username
				//photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
			})
		.then(() => {
			this.saveUser(createdUser).then(() => {
				console.log('user saved');
			})
		})

		.catch(err => {
			console.log(err);
			this.setState({errors: this.state.errors.concat(err) ,loading: false})
		})

	})
	.catch(err => {
		console.log(err);
		this.setState({errors: this.state.errors.concat(err) ,loading: false})
	})	
}
}

saveUser = (createdUser) => {
	return this.state.usersRef.child(createdUser.user.uid).set({
	name: createdUser.user.displayName,	
	avatar: createdUser.user.photoURL
	});
}



 render() {

const {username, email, password, passwordConfirmation, loading, errors} = this.state

	return(

		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{maxWidth: 450}} >
				<Header as="h1" icon color="orange" 
					textAlign="center">
					<Icon name="puzzle piece" 
						color="orange" />
					Register for URSANOVA
				</Header>
			<Form size="large" onSubmit={this.handleSubmit}>
				<Segment stacked>
					<Form.Input 
					fluid name="username" 
					icon="mail" 
					iconPosition="left"
					placeholder="Username" 
					value={username}
					onChange={this.handleChange} 
					type="text"/>

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

					<Form.Input 
					fluid name="passwordConfirmation" 
					icon="repeat" 
					iconPosition="left"
					value={passwordConfirmation}
					placeholder="Password Confirmation" 
					onChange={this.handleChange} 
					type="password"/>

					<Button
					disabled={loading}
					className={loading ? 'loading' : ''} 
					color="orange" 
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

			<Message>Already a user? <Link to="/login">Login</Link></Message>
			</Grid.Column>
		</Grid>

			);
	}
}

export default Register