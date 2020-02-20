import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';

import App from '../components/App';

const Root=(props)=>{
	return(
		<Provider store={props.store}>
			<Router history={props.history}>
				<App {...props} />
			</Router>
		</Provider>
	);
}

Root.propTypes={
	history:PropTypes.object.isRequired,
	routes:PropTypes.array.isRequired,
	store:PropTypes.object.isRequired
}

export default Root;