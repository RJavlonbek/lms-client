import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme)=>({
	select:{
		width: '100%'
	}
}));

const SelectMenu=({
	options = [], 
	value,
	className, 
	changeHandler = (v)=>{},
	multiple = false, // Boolean: whether multiple or not
	itemType = 'simple' // String: represents view type of option items. Values: 'simple' || 'checkbox'
})=>{
	const [option, setOption] = React.useState(value ? value : (multiple ? [] : ''));
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);

	React.useEffect(() => {
	    setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
	  PaperProps: {
	    style: {
	      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
	      width: 250,
	    },
	  },
	};

	const handleChange = event => {
		console.log('changed', event.target.value);
	   	setOption(event.target.value);
	   	changeHandler(event.target.value);
	};

	// preparing menu items
	let menuItems = '';
	if(itemType === 'checkbox'){
		menuItems = options.map((option, i)=>{
			return(
				<MenuItem key={i} value={option._id}>
				  	<Checkbox checked={option.indexOf(option._id) > -1} />
				  	<ListItemText primary={option.name} />
				</MenuItem>
			);
		})
	}
	if(itemType === 'simple'){
		menuItems = options.map((th,i)=>{
			return(
				<MenuItem key={i} value={th._id}>{th.name}</MenuItem>
			)
		});
	}

	return(
    	<FormControl variant="outlined" margin="normal" className={classes.select + ' ' + className}>
    	    <InputLabel ref={inputLabel} id={"demo-simple-select-outlined-label"}>
    	        Category
    	    </InputLabel>
    	    <Select
	          	labelId="demo-simple-select-outlined-label"
	          	id="demo-simple-select-outlined"
	          	name={'category'}
	          	value={option}
	          	onChange={handleChange}
	          	labelWidth={labelWidth}
	          	multiple={multiple}
    	    >
    	        {menuItems}
    	    </Select>
    	</FormControl>
	)
}

const Options = ({items, value, itemType})=>{
	if(itemType === 'checkbox'){
		return items.map((option, i)=>{
			return(
				<MenuItem key={i} value={option._id}>
				  	<Checkbox checked={value.indexOf(option._id) > -1} />
				  	<ListItemText primary={option.name} />
				</MenuItem>
			);
		})
	}

	if(itemType === 'simple'){
		return items.map((th,i)=>{
			return(
				<MenuItem key={i} value={th._id}>{th.name}</MenuItem>
			)
		});
	}
}

export default SelectMenu;