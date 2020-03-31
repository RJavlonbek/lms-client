import React from 'react';
import {Route} from 'react-router-dom';

import Main from './Main';

const Router=(props)=>{
	return(
		<div>
			<Route exact path={props.match.path} component={Main} />
			<Route exact path={props.match.path+'/:slug'} component={Main} />
		</div>
	)
}

export default Router;