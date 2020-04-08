import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Dashboard from '../../modules/Dashboard/main/Main';

const Home=(props)=>(
	<Dashboard />
);

Home.propTypes={
	title:PropTypes.string.isRequired
}

export default Home;