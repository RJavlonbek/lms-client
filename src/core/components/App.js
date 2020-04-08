import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Layout from './Layout';

const App=(props)=>{
	console.log('App', props);
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
		<Layout>
			<Switch>
				<Route exact path={'/'} component={Home} />
				{routes}
			</Switch>
		</Layout>
	);
}

App.propTypes={
	routes:PropTypes.array
}

export default App;