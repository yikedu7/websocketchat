import React from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import SockJsClient from 'react-stomp';
import {Route, Switch, withRouter} from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuth: false,
		};
	
	sendMessage = (msg, to, selfMsg) => {
	    try {
	      	this.clientRef.sendMessage(to, JSON.stringify(selfMsg));
      		return true;
	    } catch(e) {
	      	return false;
	    }
 	}
	}

 	handleLogin(redirectTo="/chat") {
		var history = this.props.history;

		// do auth
		this.setState({
			isAuth: true,
		}, function() {
			history.push(redirectTo);
		});
	}

	render() {
		return(
			//<Login stompClient={this.state.stompClient} setClient={client => this.setClient(client)}></Login>
			//<ChatPage></ChatPage>
			<div>
				<SockJsClient url='http://localhost:8080/ws' 
					topic={this.state.isAuth ? ['/topic/public'] : null}
					ref={ (client) => { this.clientRef = client }}
					onMessage={this.sendMessage}		
				></SockJsClient>
				<Switch>
					<Route exact path="/" 
						render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
					<Route path="/chat" 
						render={(props) => <Chat sendMessage={this.sendMessage} {...props}/>} />
				</Switch>
				{ /*React.cloneElement(this.props.children, this.state)*/ }
			</div>
		);
	}
}

export default withRouter(App);