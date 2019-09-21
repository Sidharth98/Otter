import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel.js';
import Channels from './Channels.js';
class SidePanel extends Component {
	render() {
		const {currentUser} = this.props;
		return (

		<Menu
			size="large"
			inverted
			fixed="left"
			vertical
			style={{background: "#0000A0", fontSize: "1.2rem"}}
		>	
		<UserPanel currentUser={currentUser} />
		<Channels currentUser={currentUser}/>
		</Menu>
			);
	}
}

export default SidePanel;