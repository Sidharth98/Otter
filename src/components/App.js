import React from 'react';
import {Grid} from 'semantic-ui-react';
//import './App.css';
import {connect} from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel.js';
import SidePanel from './SidePanel/SidePanel.js';
import Messages from './Message/Messages.js';
import MetaPanel from './MetaPanel/MetaPanel.js';


const App = ({currentUser, currentChannel}) => (


<Grid columns="equal" className="app" style={{background: '#eee'}}>
	<ColorPanel />
	<SidePanel 
	key={currentUser && currentUser.uid}
	currentUser={currentUser}/>
	<Grid.Column style={{marginLeft: 320}}>
		<Messages 
		key={currentChannel && currentChannel.id}
		currentChannel={currentChannel}
		currentUser={currentUser}
		 />
		}
	</Grid.Column>	
	<Grid.Column width={4}>
		<MetaPanel />
	</Grid.Column>	
</Grid>

	

)


const mapStateToProps = state =>({

currentUser: state.user.currentUser,
currentChannel: state.channel.currentChannel


})


export default connect(mapStateToProps)(App);
