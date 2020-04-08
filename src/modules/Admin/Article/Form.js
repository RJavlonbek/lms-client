import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
	Grid,
	Box
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
	Button,
	LinearProgress,
	CircularProgress
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import Title from '../components/Title';
import Selectmenu from '../components/Selectmenu';
import Paragraphs from './components/Paragraphs';
import {
	fileUpload,
	isObject
} from '../../functions'; 

import {
	LOAD_ITEM_REQ, 
	LOAD_ITEM_RES, 
	SAVE_REQ, 
	SAVE_RES
} from './index';
import {
	LOAD_ITEMS_REQ as LOAD_CATEGORIES_REQ, 
	LOAD_ITEMS_RES as LOAD_CATEGORIES_RES
} from '../Category';
import {
	LOAD_ITEMS_REQ as LOAD_AUTHORS_REQ,
	LOAD_ITEMS_RES as LOAD_AUTHORS_RES
} from '../Author';
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
    button:{
    	float:'right'
    }
}));

export function FormCard({item, match, categories = [], authors = [], update, action, saving}) {
  	const classes = useStyles();
  	const [redirect, setRedirect]=React.useState('');
  	const [title, setTitle] = React.useState(item.title);
  	const [category, setCategory] = React.useState(item.category || []);
  	const [author, setAuthor] = React.useState(item.author ? (isObject(item.author) ? item.author._id : item.author) : '');
  	const [subtitle, setSubtitle] = React.useState(item.subtitle || '');
  	const [paragraphs, setParagraphs] = React.useState(item.paragraphs || [{content:''}]);
  	const [image, setImage] = React.useState(null);

  	const submitHandler=e=>{
  		var inputs=e.target.elements;
  		var data= new FormData();

  		data.append('title', title);
  		data.append('subtitle', subtitle);
  		data.append('category', JSON.stringify(category));
  		data.append('author', author);
  		data.append('paragraphs', JSON.stringify(paragraphs));
  		data.append('image', image);

  		if(action==='edit'){
  			data.append('id', match.params.itemId);	
  		}

  		update(data).then((json)=>{
  			if(json.result!=='success'){
  				// do something if saving was unsuccessful
  			}
			fileUpload(image, json.filename).then((uploadResponse)=>{
				if(uploadResponse.result !== 'success'){
					// do something if file uploading was unsuccessful	
				}
				setRedirect('/admin/articles');
			});
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
	      			<Link to={'/admin/articles'}><Button variant='contained' color='primary'><ChevronLeft /> Back to list</Button></Link>
	      		</Grid>
	        	<Grid item xs={12}>
	          		<Paper className={classes.paper}>
					    <form onSubmit={submitHandler}>
					    	<Grid container spacing={3} >
						    	<Grid item sm={6}>
							    	<TextField
					    	          	id="outlined-basic"
					    	          	className={classes.textField}
					    	          	label={"Title"}
					    	         	margin="normal"
					    	          	variant="outlined"
					    	          	name='title'
					    	          	defaultValue={title}
					    	          	required
					    	          	onChange={(e)=>{setTitle(e.target.value)}}
					    	        />
					    	    </Grid>
					    	    <Grid item sm={6}>
	    	        		    	<Selectmenu 
	    	        		    		options={categories} 
	    	        		    		value={category.map((c, i)=>(c._id))} 
	    	        		    		className={classes.selectCategory} 
	    	        		    		multiple={true}
	    	        		    		changeHandler={(val)=>setCategory(val)}
	    	        		    		label = {"Category"}
	    	        		    	/>
	    	            	    </Grid>
	    	            	    <Grid item sm={6}>
	    	        		    	<Selectmenu 
	    	        		    		options={authors} 
	    	        		    		value={author} 
	    	        		    		className={classes.selectCategory}
	    	        		    		changeHandler={setAuthor}
	    	        		    		label = {"Author"}
	    	        		    	/>
	    	            	    </Grid>
	    	            	    <Grid item xs={6}>
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
	            	    	          	label="Subtitle"
	            	    	          	multiline
	            	    	          	rows="2"
	            	    	          	defaultValue={subtitle}
	            	    	          	className={classes.textField}
	            	    	          	onChange={(e)=>{setSubtitle(e.target.value)}}
	            	    	        />
	    	            	    </Grid>
	    	            	    <Grid item sm={12}>
	    	            	    	<Paragraphs 
	    	            	    		items={paragraphs}
	    	            	    		changeHandler={(val)=>setParagraphs(val)} 
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

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state={
			action:this.props.match.params.itemId ? 'edit' : 'add'
		}
	}
	componentDidMount(){
		const {loadItem, match, setTitle, loadCategories, categories, loadAuthors, authors}=this.props;
		if(match.params.itemId){
			setTitle('Edit article');
			loadItem(match.params.itemId);
		}else{
			setTitle('Add article');
		}
		
		if(!categories.length){
			loadCategories();
		}

		if(!authors.length){
			loadAuthors();
		}
	}
	render(){
		console.log('Edit item',this.props);
		const {match, item, update, loadingItem, saving, categories, authors}=this.props;
		const {action}=this.state;
		
		if(loadingItem){
			return(
				<LinearProgress />
			)
		}

		return(
			<FormCard 
				action={action} 
				item={action==='edit'?item:{}} 
				match={match} 
				categories={categories}
				authors={authors}
				update={update} 
				saving={saving}
			/>
		);
	}
}

const Image = ({image})=>{
	if(!image){
		return '';
	}
	return(
		<Box width={300}>
			<img src={image.url}  />
		</Box>
	)
}

const mapStateToProps=(state)=>{
	const s=state.Admin.Article;
	const c=state.Admin.Category;
	const a=state.Admin.Author;
	return {
		items:s.items,
		item:s.item,
		loadingItem:s.loadingItem,
		saving:s.saving,
		categories:c.items,
		authors: a.items
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		loadItem:(itemId)=>{
			dispatch({type:LOAD_ITEM_REQ});
			return fetch('/api/article/get?id='+itemId).then((res)=>res.ok?res.json():{}).then((json)=>{
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
			return fetch('/api/article/store',{
				method:'POST',
				body:data,
				// headers:{
				// 	'Content-Type': 'multipart/form-data'
				// }
			}).then((res)=>res.ok?res.json():{}).then((json)=>{
				dispatch({
					type:SAVE_RES,
					payload:{
						item:json.data,
						result:json.result
					}
				});
				return json;
			});
		},
		loadCategories:()=>{
			dispatch({
				type:LOAD_CATEGORIES_REQ
			});
			return fetch('/api/category/get').then((res)=>res.ok?res.json():[]).then((items)=>{
				dispatch({
					type:LOAD_CATEGORIES_RES,
					payload:{
						items
					}
				});
			});
		},
		loadAuthors:()=>{
			dispatch({
				type: LOAD_AUTHORS_REQ
			});
			return fetch('/api/author/get').then((res)=>res.ok ? res.json() : []).then((authors)=>{
				dispatch({
					type: LOAD_AUTHORS_RES,
					payload:{
						items: authors
					}
				});
			})
		}
	}
}

const ListContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);

export default ListContainer;