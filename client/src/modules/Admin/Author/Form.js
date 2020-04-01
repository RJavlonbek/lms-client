import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
	Button,
	LinearProgress,
	CircularProgress,
	Box
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import Title from '../components/Title';
import {fileUpload} from '../../functions';

import {LOAD_ITEM_REQ, LOAD_ITEM_RES, SAVE_REQ, SAVE_RES} from './index';
import {SET_TITLE} from '../index';

const useStyles = makeStyles(theme => ({
  	container: {
    	paddingTop: theme.spacing(4),
    	paddingBottom: theme.spacing(4),
  	},
  	paper: {
	    padding: theme.spacing(2),
	    display: 'flex',
	    overflow: 'auto',
	    flexDirection: 'column',
  	},
  	textField: {
      	width: '100%'
    },
    themesSelect:{
    	width:'100%'
    },
    button:{
    	float:'right'
    }
}));

export function FormCard({item, match, themes, update, action, saving}) {
  	const classes = useStyles();
  	const [redirect, setRedirect]=React.useState('');
  	const [firstname, setFirstname] = React.useState(item.firstname);
  	const [lastname, setLastname] = React.useState(item.lastname);
  	const [description, setDescription] = React.useState(item.description);
  	const [image, setImage] = React.useState(null);

  	const submitHandler=e=>{
  		let data = new FormData();

  		data.append('firstname', firstname);
  		data.append('lastname', lastname);
  		data.append('description', description);
  		data.append('image', image);

  		if(action==='edit'){
  			data.append('id', match.params.itemId);	
  		}

  		update(data).then((json)=>{
  			if(json.result==='success'){
  				setRedirect('/admin/authors');
  			}
  		});
  		
  		e.preventDefault();
  	}

  	if(redirect){
  		console.log('redirecting',redirect);
  		return(
  			<Redirect to={redirect} />
  		);
  	}

  	return (
	    <Container maxWidth="lg" className={classes.container}>
	      	<Grid container spacing={3}>
	      		<Grid item xs={6}>
	      			<Link to={'/admin/authors'}><Button variant='contained' color='primary'><ChevronLeft /> Back to list</Button></Link>
	      		</Grid>
	        	<Grid item xs={12}>
	          		<Paper className={classes.paper}>
					    <form onSubmit={submitHandler}>
					    	<Grid container spacing={3} >
						    	<Grid item sm={6}>
							    	<TextField
					    	          	id="outlined-basic"
					    	          	className={classes.textField}
					    	          	label={"Firstname"}
					    	         	margin="normal"
					    	          	variant="outlined"
					    	          	name='firstname'
					    	          	defaultValue={firstname}
					    	          	required
					    	          	onChange={e=>setFirstname(e.target.value)}
					    	        />
					    	    </Grid>
					    	    <Grid item sm={6}>
							    	<TextField
					    	          	id="outlined-basic"
					    	          	className={classes.textField}
					    	          	label={"Lastname"}
					    	         	margin="normal"
					    	          	variant="outlined"
					    	          	name='lastname'
					    	          	defaultValue={lastname}
					    	          	required
					    	          	onChange={e=>setLastname(e.target.value)}
					    	        />
					    	    </Grid>
        	            	    <Grid item xs={12}>
        	            	    	<Image image={item.image} />
    	    	            	    <Button
    	    	            	      variant="contained"
    	    	            	      component="label"
    	    	            	    >
    	    	            	      	Upload image
    	    	            	      	<input
    		    	            	        type="file"
    		    	            	        style={{ display: "none" }}
    		    	            	        onChange={(e)=>{setImage(e.target.files[0])}}
    	    	            	      	/>
        	            	    	</Button>
        	            	    </Grid>
	    	            	    <Grid item sm={12}>
	    	            	    	<TextField
	    	            	    		variant="outlined"
	            	    	          	id="outlined-multiline-static"
	            	    	          	label="Description"
	            	    	          	multiline
	            	    	          	rows="4"
	            	    	          	defaultValue={description}
	            	    	          	className={classes.textField}
	            	    	          	onChange={(e)=>{setDescription(e.target.value)}}
	            	    	        />
	    	            	    </Grid>
	    	            	    <Grid item sm={12}>
		    	            	    <Button type='submit' variant="contained" color="primary" className={classes.button} disabled={saving}>
		    	            	        {saving ? <CircularProgress size={'1rem'} /> : 'Save'}
		    	            	    </Button>
		    	            	</Grid>
	    	            	</Grid>
				    	</form>
	           		</Paper>
	         	</Grid>
	       	</Grid>
	    </Container>
  	);
}

const Image = ({image})=>{
	if(!image){
		return '';
	}
	return(
		<Box width={60}>
			<img src={image.url}  />
		</Box>
	)
}

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state={
			action:''
		}
	}
	componentDidMount(){
		const {loadItem, match, setTitle}=this.props;
		if(match.params.itemId){
			this.setState({action:'edit'});
			setTitle('Edit category');
			loadItem(match.params.itemId);
		}else{
			this.setState({action:'add'});
			setTitle('Add category');
		}
		
	}
	render(){
		console.log('Edit Request',this.props);
		const {match, item, themes, update, loadingItem, saving}=this.props;
		const {action}=this.state;
		if(!loadingItem){
			return(
				<FormCard action={action} item={action=='edit'?item:{}} match={match} themes={themes} update={update} saving={saving}/>
			);
		}else{
			return(
				<LinearProgress />
			)
		}
	}
}

const mapStateToProps=(state)=>{
	const s=state.Admin.Author
	return {
		items:s.items,
		item:s.item,
		loadingItem:s.loadingItem,
		saving:s.saving
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		loadItem:(itemId)=>{
			dispatch({type:LOAD_ITEM_REQ});
			return fetch('/api/author/get?id='+itemId).then((res)=>res.ok?res.json():{}).then((json)=>{
				dispatch({
					type:LOAD_ITEM_RES,
					payload:{
						item:json
					}
				});
			});
		},
		setTitle:(title)=>{
			dispatch({
				type:SET_TITLE,
				payload:title
			});
		},
		update:(data)=>{
			dispatch({
				type:SAVE_REQ
			});
			return fetch('/api/author/store',{
				method:'POST',
				body:data
			}).then((res)=>res.ok?res.json():{}).then((json)=>{
				return fileUpload(data.get('image'), json.filename).then((uploadResponse)=>{
					dispatch({
						type:SAVE_RES,
						payload:{
							item:json.data,
							result:json.result
						}
					});
					return json;
				})
			});
		}
	}
}

const ListContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);

export default ListContainer;