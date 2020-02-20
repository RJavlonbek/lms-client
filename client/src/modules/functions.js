import React from 'react';
import ReactDOM from 'react-dom';
import Alert from '@material-ui/lab/Alert';

export const defineModule=(
	title,
	path,
	component,
	reducer=(state={})=>state,
	children=null,
	onEnter=null,
)=>{
	return {title,path,component,reducer,onEnter,children}
}

export const flatModules = modules => Object.keys(modules).map(x => {
    const res = Array.isArray(modules[x]) ? modules[x] : [modules[x]];
    res.forEach(y => y.MODULE = x)
    return res
}).reduce((c,n) => c.concat(n));

export const alertError = (options)=>{
	ReactDOM.createPortal(
		<Alert severity="error">This is an error alert — check it out!</Alert>,
		document.getElementById('alert-error'));
}