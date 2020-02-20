import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import Alert from './components/Alert';
import Layout from './Layout';
import withAuth from './withAuth';
import theme from './theme';

class Admin extends React.Component{
	render(){
		const props=this.props;

    	return(
    		<ThemeProvider theme={theme}>
    			<Alert />
	    		<Layout {...props} >
					<Routes routes={props.routes} match={props.match} />
				</Layout>
			</ThemeProvider>
    	);
	}
}

const Routes=({routes, match})=>{
	return  routes.map((route,index) => {
		return(
        	<Route exact={route.path === match.path + '/'} path={route.path} key={route.path} component={withAuth(route.component, route.title)} title={route.title} />
        );
    });
}
 
export default withAuth(Admin);