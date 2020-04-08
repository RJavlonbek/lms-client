import React from 'react';
import RactDOM from 'react-dom';
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import {Collapse} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {ALERT_CLOSE} from '../index';

const useStyles = makeStyles((theme)=>({
	collapse:{
		position:'absolute',
		top: '0.8rem',
		right:'0.8rem',
		zIndex:9999
	}
}))

const CustomAlert =({type, text, close, open})=>{
	const classes=useStyles();
	console.log('alert rendering', open);
	if(!type){
		return null;
	}

	setTimeout(()=>close(), 5000);

	return(
		<Collapse in={open} className={classes.collapse} >
			<Alert severity={type} onClose={()=>close()}>{text.toString()}</Alert>
		</Collapse>
	);
}

const mapStateToProps = state=>{
	return {
		...state.Admin.alert
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		close:()=>{
			dispatch({
				type:ALERT_CLOSE
			});
		}
	}
}

const CustomAlertContainer = connect(mapStateToProps, mapDispatchToProps)(CustomAlert);

export default CustomAlertContainer;

