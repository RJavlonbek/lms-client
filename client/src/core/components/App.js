import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';

const App=(props)=>{
	const routes=props.routes.map((route,index) => {
		if(route.routes && route.routes.length){
			return(
				<Route path={route.path} key={route.path} render={(props)=>{
					return(	
						<route.component {...props} title={route.title} routes={route.routes} />
					);
				}} />
			);
		}else{
			return(
	        	<Route path={route.path} key={route.path} component={route.component} />
	        );
		}
    });

	return(
		<Switch>
			<Route exact path={'/'} component={Home} />
			{routes}
		</Switch>
	);
}

App.propTypes={
	routes:PropTypes.array
}

export default App;