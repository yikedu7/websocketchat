import React from 'react';

let PubSub = require('pubsub-js');

let Chat = React.createClass({
	sendMessage() {
		var stompClient = this.props.stompClient;
		var messageContent = $("#message").val().trim();

	    if(messageContent && stompClient) {
	        var chatMessage = {
	            sender: username,
	            content: messageInput.value,
	            type: 'CHAT'
	        };

	        /* API: (void) send(destination, headers = {}, body = '') */
	        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
	       $("#message").val('');
	    }
	    event.preventDefault();
	},
	onMessageReceived(payload) {
		var message = JSON.parse(payload.body);

	    var messageElement = document.createElement('li');

	    if(message.type === 'JOIN') {
	        messageElement.classList.add('event-message');
	        message.content = message.sender + ' joined!';
	    } else if (message.type === 'LEAVE') {
	        messageElement.classList.add('event-message');
	        message.content = message.sender + ' left!';
	    } else {
	        messageElement.classList.add('chat-message');

	        var avatarElement = document.createElement('i');
	        var avatarText = document.createTextNode(message.sender[0]);
	        avatarElement.appendChild(avatarText);
	        avatarElement.style['background-color'] = getAvatarColor(message.sender);

	        messageElement.appendChild(avatarElement);

	        var usernameElement = document.createElement('span');
	        var usernameText = document.createTextNode(message.sender);
	        usernameElement.appendChild(usernameText);
	        messageElement.appendChild(usernameElement);
	    }

	    var textElement = document.createElement('p');
	    var messageText = document.createTextNode(message.content);
	    textElement.appendChild(messageText);

	    messageElement.appendChild(textElement);

		var messageArea = document.querySelector('#messageArea');
	    messageArea.appendChild(messageElement);
	    messageArea.scrollTop = messageArea.scrollHeight;
	},
	componentDidMount() {
		PubSub.subscribe('RECV_MSG', (msg, payload) => {
			this.onMessageReceived(payload);
		});
	},
	componentWillMount() {
		PubSub.unsubscribe('RECV_MSG');
	},
	render() {
		return (
			<div id="chat-page" className=" ">
		        <div className="chat-container">
		            <div className="chat-header">
		                <h2>Spring WebSocket Chat Demo</h2>
		            </div>
		            <ul id="messageArea">

		            </ul>
		            <form id="messageForm" name="messageForm">
		                <div className="form-group">
		                    <div className="input-group clearfix">
		                        <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control"/>
		                        <button type="submit" className="primary">Send</button>
		                    </div>
		                </div>
		            </form>
		        </div>
	        </div>
		); 
	}
});

export default Chat;