import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Home=(props)=>(
	<Redirect to={'/article'} />
);

Home.propTypes={
	title:PropTypes.string.isRequired
}

export default Home;