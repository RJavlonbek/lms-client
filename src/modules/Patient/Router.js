import React from 'react';
import {Route} from 'react-router-dom';

import Main from './main/Main';
import ArticleSingle from './article-single/ArticleSingle';
import Register from './register/Register';

const Router=(props)=>{
	return(
		<div>
			<Route exact path={props.match.path} component={Main} />
			<Route exact path={props.match.path + '/register'} component={Register} />
			<Route exact path={props.match.path+'/view/:slug'} component={ArticleSingle} />
		</div>
	);
}

export default Router;