import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Board from './components/DashBoard/DashBoard';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers'
import {setUser, clearUser} from './actions';
//import Spinner from './spinner.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import "circular-std";

const store = createStore(rootReducer, composeWithDevTools());




class Root extends Component {

	componentDidMount() {
		console.log(this.props.isLoading)
		firebase.auth().onAuthStateChanged(user => {
			if(user) {
				this.props.setUser(user)
				this.props.history.push("/")
			} else {
				this.props.history.push("/login")
				this.props.clearUser();


			}
		});
	}



	render() {
		
	return(
		<div>
		<Switch>
			<Route path="/dashboard" component={Board} />
			<Route exact path="/" component={App} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
		</Switch>
		</div>
	);
}
}

const mapStateToProps = state => ({

	isLoading: state.user.isLoading

})


const RootWithAuth = withRouter(connect(
	mapStateToProps,
	{setUser, clearUser}
	)(Root)

);

ReactDOM.render(
<Provider store={store}>	
	<Router>
		<RootWithAuth />
	</Router>
</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
return this.props.isLoading ? <Spinner /> : ( */