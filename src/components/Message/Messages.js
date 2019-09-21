import React, {Component} from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader.js';
import MessageForm from './MessageForm.js';
import firebase from '../../firebase';
import Message from './Message.js';

class Messages extends Component {
	
state = {
	messagesRef: firebase.database().ref('messages'),
	channel: this.props.currentChannel,
	user: this.props.currentUser,
	messages: [],
	messagesLoading: true,
	numUniqueUsers: '',
	searchTerm: '', 
	searchLoading: false,
	searchResults: []
}


componentDidMount() {
	const {channel, user} = this.state;

	if(channel && user) {
		this.addListeners(channel.id);
	}
}


addListeners = channelId =>{
	this.addMessageListener(channelId);
}


addMessageListener = channelId => {
	let loadedMessages = [];
	this.state.messagesRef.child(channelId).on('child_added', snap => {
		loadedMessages.push(snap.val());
		this.setState({
			messages: loadedMessages,
			messagesLoading: false
		})

		this.countUniqueUsers(loadedMessages);
	})
}






countUniqueUsers = messages => {
	const uniqueUsers = messages.reduce((acc, message) =>{
		if(!acc.includes(message.user.name)) {
			acc.push(message.user.name);
		}
		return acc;
	}, []);
	const numUniqueUsers = `${uniqueUsers.length} users`;
	this.setState({numUniqueUsers })
}


handleSearchChange = event => {
	this.setState({
		searchTerm: event.target.value,
		searchLoading:  true
	}, () => this.handleSearchMessages());
}

handleSearchMessages = () => {
	const channelMessages = [...this.state.messages];
	const regex = new RegExp(this.state.searchTerm, 'gi')
	const searchResults = channelMessages.reduce((acc,message) => {
		if(message.content && message.content.match(regex)) {
			acc.push(message);

		}
		return acc;

	}, [])
	this.setState({searchResults});
}



displayMessages = messages => (

	messages.length > 0 && messages.map(message => (
		<Message 
			key={message.timestamp}
			message={message}
			user={this.state.user}
		/>

		))


	)


displayChannelName= channel => channel ? `#${channel.name}` : '';



	render() {

	const { messagesRef, channel, user, messages, numUniqueUsers, searchTerm, searchResults } = this.state;	
		return (
		<React.Fragment>
			<MessagesHeader
				channelName={this.displayChannelName(channel)}
				numUniqueUsers = {this.numUniqueUsers}
				handleSearchChange = {this.handleSearchChange}
			 />


			<Segment>
				<Comment.Group className="messages">
					{searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}	
					

				</Comment.Group>
			</Segment>
			
			<MessageForm 
			messagesRef={messagesRef}
			currentChannel={channel}
			currentUser={user}
			/>

		</React.Fragment>		

			);
	}
}

export default Messages;