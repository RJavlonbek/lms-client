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

// export const alertError = (options)=>{
// 	ReactDOM.createPortal(
// 		<Alert severity="error">This is an error alert — check it out!</Alert>,
// 		document.getElementById('alert-error'));
// }

// function for uploading files to my PHP Cloud (cloud.javelin.uz). It is being used because of that Heroku Apps are not able to handle file uploading
export const fileUpload = (file, filename)=>{
	if(!filename){
		return {
			result: 'success',
			message: 'no need for uploading to cloud'
		}
	}
	const app = 'medium';
	const url = "https:/\/cloud.javelin.uz/file-upload.php";

	let data = new FormData();
	data.append('app', app);
	data.append('filename', filename);
	data.append('file', file);

	return fetch(url, {
		method: 'POST',
		body: data,
		headers:{
			'Accept': 'application/json'
		}
	}).then((res)=>{
		if(res.ok){
			return res.json();
		}
		return {
			result: 'error',
			message: 'request to cloud failed'
		}
	}).catch((err)=>{
		console.error('Error on file uploading: ', err);
		return {
			result: 'error',
			message: 'Error on file uploading: ' + err
		}
	});
}