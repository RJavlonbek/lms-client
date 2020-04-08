import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {CircularProgress} from '@material-ui/core';

import Alert from './components/Alert';

import {SIGN_IN_REQ, SIGN_IN_RES, ALERT} from './index';
import {alertError} from '../functions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        RJ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
		}
	}
	changeHandler=(name,value)=>{
		this.setState({[name]:value});
	}
	submitHandler=()=>{
		const {signIn} = this.props;
		signIn(this.state.email,this.state.password);
	}
	render(){
		const {signIn,user,match}=this.props;
		const {email,password}=this.state;

		console.log('Login', this.props);

		if(user && user.loggedIn){
			let redirectUrl=window.localStorage.getItem('lastVisitedPath');
			return(
				<Redirect to={redirectUrl ? redirectUrl : '/admin'} />
			);
		}

		return (
		  	<Container component="main" maxWidth="xs">
			    <CssBaseline />
			    <LoginForm changeHandler={this.changeHandler} submitHandler={this.submitHandler} failed={user.loginAttempted} authenticating={user.authenticating} />
			    <Alert />
			    <Box mt={8}>
			      	<Copyright />
			    </Box>
		  	</Container>
		);
	}
}

const LoginForm=({changeHandler,submitHandler, failed, authenticating})=>{
	const classes = useStyles();
	return(
		<div className={classes.paper}>
		  	<Avatar className={classes.avatar}>
		    	<LockOutlinedIcon />
		  	</Avatar>
		  	<Typography component="h1" variant="h5">
		    	Sign in
		  	</Typography>
		  	<form className={classes.form} onSubmit={(e)=>{e.preventDefault(); submitHandler(); }}>
			    <TextField
			    	error={failed}
			      	variant="outlined"
			      	margin="normal"
			      	required
			      	fullWidth
			      	id="email"
			      	label="Email Address"
			      	name="username"
			      	autoComplete="off"
			      	autoFocus
			      	onChange={(e)=>changeHandler('email',e.target.value)}
			    />
			    <TextField
			    	error={failed}
			      	variant="outlined"
			      	margin="normal"
			      	required
			      	fullWidth
			      	name="password"
			      	label="Password"
			      	type="password"
			      	id="password"
			      	autoComplete="off"
			      	onChange={(e)=>changeHandler('password',e.target.value)}
			    />
			    <FormControlLabel
			      control={<Checkbox value="remember" color="primary" />}
			      label={"Remember me"}
			    />
			    <Button
			      type="submit"
			      fullWidth
			      variant="contained"
			      color="primary"
			      className={classes.submit}
			      disabled={authenticating}
			    >
			    	{authenticating ? <CircularProgress /> : 'Sign In' }
			    </Button>
			    <Grid container>
			      <Grid item xs>
			        <Link href="#" variant="body2">
			          Forgot password?
			        </Link>
			      </Grid>
			      <Grid item>
			        <Link href="#" variant="body2">
			          {"Don't have an account? Sign Up"}
			        </Link>
			      </Grid>
			    </Grid>
		  	</form>
		</div>
	);
}

const mapStateToProps=state=>{
	return {
		user:state.Admin.user
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		signIn:(username,password)=>{
			dispatch({
				type:SIGN_IN_REQ
			});
			return fetch('/admin/login',{
				method:'POST',
				body:JSON.stringify({username,password}),
				headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			    }
			}).then((res)=>res.json()).then((json)=>{
				dispatch({
					type:SIGN_IN_RES,
					payload:{
						...json.user,
						loginAttempted: true
					}
				});
				if(json.result==='success'){
					
				}
			}).catch((err)=>{
				// end sign in request
				dispatch({
					type:SIGN_IN_RES,
					payload:{}
				});

				// alert error
				dispatch({
					type:ALERT,
					payload:{
						type:'error',
						text: 'Connection with server failed...'
					}
				});
			});
		},
		alert:(options)=>{
			dispatch({
				type: ALERT,
				payload: options
			});
		}
	}
}

const LoginContainer=connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;