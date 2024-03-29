import React,{Component} from 'react';
import {Segment, Button, Input} from 'semantic-ui-react';
import firebase from '../../firebase';
import uuidv4 from 'uuid/v4';
import FileModal from './FileModal.js';
import ProgressBar from './ProgressBar.js';
class MessageForm extends Component {

state = {
	message: '',
	channel:this.props.currentChannel,
	loading: false,
	user: this.props.currentUser, 
	errors: [],
	percentUploaded: 0,
	modal:false,
	uploadState: '',
	uploadTask: null,
	storageRef: firebase.storage().ref()

}

openModal = () => {
	this.setState({modal: true})
}

closeModal = () => {
	this.setState({modal: false})
}



handleChange = event => {
	this.setState({[event.target.name]: event.target.value});
}


createMessage = (fileUrl=null) => {
	const message = {
		content: this.state.message,
		timestamp: firebase.database.ServerValue.TIMESTAMP,
		user: {
			id: this.state.user.uid,
			name: this.state.user.displayName,
			avatar: this.state.user.photoURL	
		},
	}
	if(fileUrl !== null) {
		message['image'] = fileUrl;
	} else {
		message['content'] = this.state.message;
	}
	return message;
}

sendMessage = () => {
	const {messagesRef} = this.props;
	const {message, channel} = this.state;

	if(message) {
		this.setState({loading: true});
		messagesRef
			.child(channel.id)
			.push()
			.set(this.createMessage())
			.then(() => {
				this.setState({loading: false, message: '', errors: []})
			})
			.catch(err => {
				console.error(err);
				this.setState({
					loading: false,
					errors: this.state.errrors.concat(err)
				})

			})
	}

	else{
		this.setState({
			errors: this.state.errors.concat({message: 'Add a Message'})
		})
	}
}

uploadFile = (file,metadata) => {
	const pathToUpload = this.state.channel.id;
	const ref=this.props.messagesRef;
	const filepath = `chat/public/${uuidv4()}.jpg`;

	this.setState({
		uploadState: 'uploading',
		uploadTask: this.state.storageRef.child(filepath).put(file,metadata)
	},
	() => {
		this.state.uploadTask.on('state_changed', snap => {
			const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes)*100);
			this.setState({percentUploaded});
		},
		err => {
			console.log(err);
			this.setState({
				errors: this.state.errors.concat(err),
				uploadState: 'error',
				uploadTask: null
			})
		},
		() => {
			this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
				this.sendFileMessage(downloadUrl, ref, pathToUpload)
			})
			.catch(err => {
				console.log(err);
				this.setState({
				errors: this.state.errors.concat(err),
				uploadState: 'error',
				uploadTask: null
			})
			})
		}


		)
	}


	)
}


sendFileMessage = (fileUrl, ref, pathToUpload) => {
	ref.child(pathToUpload)
		.push()
		.set(this.createMessage(fileUrl))
		.then(() => {
			this.setState({uploadState: 'done'})
		})
		.catch(err => {
			console.error(err);
			this.setState({
				errors: this.state.errors.concat(err)
			})
		})
}


	render() {

const {errors, message, loading, modal, uploadState, percentUploaded} = this.state;

		return(
			<Segment className="message__form">
				<Input
					fluid
					name="message"
					onChange={this.handleChange}
					style={{marginBottom: '0.7em'}}
					value={message}
					label={<Button icon={'add'} />}
					labelPosition="left"
					className={
						errors.some(error => error.message.includes('message')) ? 'error' : ''	
					}
					placeholder="Write Your Message"
				/>
					
				<Button.Group icon widths="2">
					<Button
						onClick={this.sendMessage}
						color="orange"
						content="Add Reply"
						labelPosition="left"
						disabled={loading}
						icon="edit"
					/>	
					<Button
						color="teal"
						disabled={uploadState === 'uploading'}
						content="Upload Media"
						labelPosition="right"
						icon="cloud upload"
						onClick={this.openModal}
					/>
				</Button.Group>	
					<FileModal
					uploadFile={this.uploadFile}
					modal={modal}
					closeModal={this.closeModal}

					 />
					 <ProgressBar 
					 	uploadState={uploadState}
					 	percentUploaded={percentUploaded}

					 />	
			</Segment>
			);
	}
}

export default MessageForm;


