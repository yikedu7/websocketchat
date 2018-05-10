import React from 'react';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

let Root = React.createClass({
	render() {
		return (
			<Router>
				<App></App>
			</Router>
		); 
	}
});

export default Root;