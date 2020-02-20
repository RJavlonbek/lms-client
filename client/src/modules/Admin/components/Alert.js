import React from 'react';
import RactDOM from 'react-dom';
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import {Collapse} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
	collapse:{
		position:'absolute',
		top: '0.8rem',
		right:'0.8rem',
		zIndex:9999
	}
}))

const CustomAlert =({type, text})=>{
	const classes=useStyles();
	const [open, setOpen] = React.useState(true)
	console.log('alert rendering', text);
	if(!type){
		return null;
	}
	return(
		<Collapse in={open} className={classes.collapse} >
			<Alert severity={type} onClose={()=>setOpen(false)}>{text.toString()}</Alert>
		</Collapse>
	);
}

const mapStateToProps = state=>{
	return {
		...state.Admin.alert
	}
}

const CustomAlertContainer = connect(mapStateToProps)(CustomAlert);

export default CustomAlertContainer;

