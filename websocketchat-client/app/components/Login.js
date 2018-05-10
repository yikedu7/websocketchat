import React from 'react';
import {Link} from 'react-router-dom';
let PubSub = require('pubsub-js');

let Login = React.createClass({
	getInitialState() {
		return {
			connecting: false,
			error: false,
		}
	},
	// connet(event) {
	// 	let username = this.refs.name.value.trim();

	//     if(username) {
	//     	/*Todo: Route*/
	//         /*usernamePage.classList.add('hidden');
	//         chatPage.classList.remove('hidden');*/

	//         /* 注册 socket */
	//         var socket = new SockJS('http://localhost:8080/ws');
	//         console.log(socket);

 //        	/* STOMP Client over socket*/
 //        	var client = Stomp.over(socket);
	//         this.props.setClient(client);

	//         this.setState({
	//         	connecting: true,
	//         });    
	//         /*this.state.stompClient = Stomp.over(socket);*/

	//         console.log(this.props.stompClient);
	//         /* API: (void) connect(headers, connectCallback, errorCallback) */

 //        	if (null !==  this.props.stompClient) {
	//         	console.log("stompClient not null");
	//         	this.props.stompClient.connect({}, this.onConnected, this.onError);
	//         } 
	//     }
	//     event.preventDefault();
	// },
	// onConnected() {
	// 	// Subscribe to the Public Topic
	//     this.props.stompClient.subscribe('/topic/public', this.onMessageReceived);

	//     // Tell your username to the server
	//     this.props.stompClient.send("/app/chat.addUser",
	//         {},
	//         JSON.stringify({sender: username, type: 'JOIN'})
	//     )
 
	//    this.setState({
	//    		connecting: false,
	//    });

	//    this.props.onLogin();

	//    console.log("Connect!");
	// },
	// onError() {
	// 	this.setState({
	// 		error: true,
	// 	});
	// },
	// onMessageReceived(payload) {
	// 	PubSub.publish('RECV_MSG', payload);
	// }, 
	render() {
		return(
			<div id="username-page">
		        <div className="username-page-container">
		            <h1 className="title">Type your username</h1>
		            <form id="usernameForm" name="usernameForm">
		                <div className="form-group">
		                    <input type="text" id="name" placeholder="Username" autoComplete="off" className="form-control" ref="name" />
		                </div>
		                <div className="form-group">
		                    <button type="submit" className="accent username-submit" onClick={this.connet}>Start Chatting</button>
		                </div>
		            </form>
		            <div className={`connecting ${this.state.connecting ? '' : 'hidden'}`} style = {{color: `${this.state.error ? 'red' : ''}` }}>
		                {`${this.state.error ? 'Could not connect to WebSocket server. Please refresh this page to try again!' : 'Connecting...'}`}
		            </div>
		        </div>
	        </div>
		);
	}
});

export default Login;