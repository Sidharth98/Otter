import React, {Component} from 'react';
import firebase from '../../firebase';
//import {connect} from 'react-redux';
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react';

class UserPanel extends Component {
	
state = {
	user: this.props.currentUser
}



dropdownOptions = () => [
	{
		key: 'user',
		text: <span>Signed in as <strong>John</strong></span>,
		disabled: true
	},
	{
		key: "avatar",
		text: <span>Change Avatar</span>
	},
	{
		key: "signout",
		text: <span onClick={this.handleSignout}>Sign Out</span>
	}
	

]


handleSignout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => console.log('Signed Out!'))
}






	render() {
		
const {user} = this.state;

		return(
			<Grid style={{background: '#0000A0'}}>
				
					<Grid.Column>
						<Grid.Row style={{padding: '1.2em', margin: 0}}>
							{/*App Header*/}
							<Header inverted floated="left" as="h2">
								<Icon name="code"/>
								<Header.Content>OTTER</Header.Content>
							</Header>		

						</Grid.Row>

					{/*User Dropdown*/}
						<Header style={{padding: '0.25em'}} as="h4" inverted>
							<Dropdown trigger={
								<span>
									John
								</span>
							} options={this.dropdownOptions()} />

						</Header>	
					</Grid.Column>
			</Grid>		
			);
	}
}




export default UserPanel;