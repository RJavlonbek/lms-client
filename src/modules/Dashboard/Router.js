import React from 'react';
import {Route} from 'react-router-dom';

import Main from './main/Main';
import ArticleSingle from './article-single/ArticleSingle';

const Router=(props)=>{
	return(
		<div>
			<Route exact path={props.match.path} component={Main} />
			<Route exact path={props.match.path+'/:slug'} component={ArticleSingle} />
		</div>
	);
}

export default Router;