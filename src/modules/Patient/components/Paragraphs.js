import React, {Fragment} from 'react';
import {
	Grid,
	Box,
	Typography,
	TextField,
	Fab,
	FormControl
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme=>({
	input:{
		width: '100%'
	},
	header:{
		marginBottom: theme.spacing(3)
	},
	addButton:{
		marginTop: theme.spacing(2)
	}
}));

const Paragraphs = ({items, changeHandler})=>{
	const classes = useStyles();
	const handler = (e)=>{
		let result = [{
			content: e.target.value
		}];
		changeHandler(result);
	}
	return(
		<Fragment>
			<Typography component='h2' variant='h4' className={classes.header}>Main content</Typography>
			{items.map((p, i)=>(<Paragraph handler={handler} defaultValue={p.content}/>))}
			<Box textAlign='center'>
				<Fab variant='extended' color='primary' aria-label='add' size='small' className={classes.addButton}>
					<AddIcon /> 
					more paragraph 
				</Fab>
			</Box>
		</Fragment>
	);
}

const Paragraph = ({defaultValue='', handler})=>{
	const classes = useStyles();
	return(
		<TextField
    		variant="outlined"
          	id="outlined-multiline-static"
          	multiline
          	rows="8"
          	defaultValue={defaultValue}
          	className={classes.input}
          	onChange={handler}
        />
	);
}

export default Paragraphs;