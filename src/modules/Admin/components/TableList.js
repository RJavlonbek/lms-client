import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
	Grid,
	Box
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {
	DeleteOutlined as DeleteIcon,
	EditOutlined as EditIcon
}  from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	TablePagination,
	Checkbox
} from '@material-ui/core';

import Title from '../components/Title';
import SearchBar from './ToolbarSearch';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  cardContent:{
  	padding:0,
  	textAlign: 'center'
  },
  loader:{
  	margin:'auto'
  },
  addButton:{
  	height:'100%',
  	float:'right'
  },
  imageCell:{
  	backgroundSize: 'cover',
  	backgroundPosition: 'center',
  	height: '60px'
  }
}));

function DeleteConfirmationDialog(props) {
  const { onClose,  open, ...other} = props;

  	return (
	    <Dialog
	      	disableBackdropClick
	      	disableEscapeKeyDown
	      	maxWidth="xs"
	     	aria-labelledby="confirmation-dialog-title"
	      	open={open}
	      	{...other}
	    >
	      	<DialogContent dividers>
	      		Are you sure to delete this item? You will not be able to recover this
	      	</DialogContent>
	      	<DialogActions>
	        	<Button autoFocus onClick={(e)=>onClose('cancel')} color="primary">
	          		Cancel
	        	</Button>
	        	<Button onClick={(e)=>onClose('ok')} color="primary">
	          		Ok
	        	</Button>
	      	</DialogActions>
	    </Dialog>
  	);
}

const TableCard=(props)=>{
	const {columnNames, rows, loading, handleDelete, path, addItemText, searchBoxPlaceholder} = props;
  	const classes = useStyles();
  	const [rowsPerPage, setRowsPerPage] = useState(10);
  	const [page, setPage] = useState(0);

  	var header=props.header?(
  		<CardHeader title={props.header} >
  		</CardHeader>
  	) : '';

  	const handlePageChange = (event, page) => {
  	  setPage(page);
  	};

  	const handleRowsPerPageChange = event => {
  	  setRowsPerPage(event.target.value);
  	};

  	return(
	    <Container maxWidth="lg" className={classes.container}>
	      	<Grid container spacing={3}>
	      		<Grid item xs={6}>
	      			<SearchBar placeholder={searchBoxPlaceholder || 'search'}/>
	      		</Grid>
	      		<Grid item xs={6}>
	      			<AddItemButton text={addItemText} link={props.path+'/add'} className={classes.addButton} />
	      		</Grid>
	        	<Grid item xs={12}>
	          		<Card className={classes.paper}>
	          			{header}
	          			<CardContent className={classes.cardContent} >
					    	<MyTable columnNames={columnNames} rows={rows} loading={loading} handleDelete={handleDelete} path={path} />
					    </CardContent>
					    <CardActions className={classes.actions}>
					      	<TablePagination
						        component="div"
						        count={props.requests ? props.requests.length : 0}
						        onChangePage={handlePageChange}
						        onChangeRowsPerPage={handleRowsPerPageChange}
						        page={page}
						        rowsPerPage={rowsPerPage}
						        rowsPerPageOptions={[5, 10, 25]}
					      	/>
					    </CardActions>
	           		</Card>
	         	</Grid>
	       	</Grid>
	    </Container>
  	);
}
TableCard.propTypes={
	requests:PropTypes.array,
	loading:PropTypes.bool,
	showDeleteDialog:PropTypes.func,
	header:PropTypes.string
}

const AddItemButton = ({text, link, className})=>{
	if(!text) return '';
	return(
		<Link to={link}>
			<Button
				className={className}
			  	color={"primary"}
			  	variant="contained"
			>
				<AddIcon />
			  	{text}
			</Button>
		</Link>
	);
}

const MyTable=({columnNames, rows, handleDelete, path, loading})=>{
	const classes = useStyles();
	const [selectedItems, setSelectedItems] = useState([]);
	let tableRows=[];
	let tableCols=[];

	const handleSelectOne = (event, id) => {
  	  	const selectedIndex = selectedItems.indexOf(id);
  	  	let newSelectedItems = [];

  	  	if (selectedIndex === -1) {
  	    	newSelectedItems = newSelectedItems.concat(selectedItems, id);
  	  	} else if (selectedIndex === 0) {
  	    	newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
  	  	} else if (selectedIndex === selectedItems.length - 1) {
  	    	newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
  	  	} else if (selectedIndex > 0) {
  	    	newSelectedItems = newSelectedItems.concat(
	  	      	selectedItems.slice(0, selectedIndex),
	  	      	selectedItems.slice(selectedIndex + 1)
  	    	);
  		}

  	  	setSelectedItems(newSelectedItems);
  	};

  	const handleSelectAll = event => {
  		var items=rows;
  	  	let selectedItems;
  	  	if (event.target.checked) {
  	    	selectedItems = items.map(i => i._id);
  	  	} else {
  	    	selectedItems = [];
  	  	}
  	  	setSelectedItems(selectedItems);
  	};

	if(!rows || loading){
		tableRows = (
			<TableRow>
				<TableCell colSpan={columnNames.length + 2} className={'text-center py-4'} >
					<CircularProgress className={classes.loader} />
				</TableCell>
			</TableRow>
		);
	}else{
		tableRows=rows.map((row,i)=>{
			let columns = row.columns.map((r, ind)=>{
				let cellStyle={}
				if(r.width){ cellStyle.width = r.width; }
				if(r.type && r.type === 'image'){
					return(
						<TableCell key={r} padding={'none'} style={cellStyle}>
							<Box className={classes.imageCell} style={{backgroundImage:'url('+r.url+')'}}></Box>
						</TableCell>
					);
				}
				return(
					<TableCell key={ind} >{r.text}</TableCell>
				);
			});

			return(
				<TableRow key={i}>
					<TableCell>
						<Checkbox
						  checked={selectedItems.indexOf(row._id) !== -1}
						  color={"primary"}
						  onChange={event => handleSelectOne(event, row._id)}
						  value={"true"}
						/>
					</TableCell>
					{columns}
				  	<TableCell>
				  		<Box display='flex' justifyContent='flex-end'>
					  		<Link to={path+'/edit/'+row._id}>
					  			<Fab color='secondary' size='small' aria-label='Edit'>
					  				<EditIcon />
					  			</Fab>
					  		</Link>
					  		<Fab size='small' aria-label='Delete' className='ml-2' onClick={(e)=>handleDelete(e, row._id)}>
					  			<DeleteIcon />
					  		</Fab>
					  	</Box>
				  	</TableCell>
				</TableRow>
			);
		});
	}

	// prepare columns
	tableCols.push(
      	<TableCell key={-1}>
      	  	<Checkbox
	      	    checked={selectedItems.length === rows.length}
	      	    color={"primary"}
	      	    indeterminate={
	      	      selectedItems.length > 0 &&
	      	      selectedItems.length < rows.length
	      	    }
	      	    onChange={handleSelectAll}
      	  	/>
      	</TableCell>
	);
	columnNames.map((col, i)=>{
		tableCols.push(
			<TableCell key={i} >{col}</TableCell>
		);
	});

	return(
		<Table size="small">
		    <TableHead>
		      <TableRow>
		      	{tableCols}
		        <TableCell align="right">Action</TableCell>
		      </TableRow>
		    </TableHead>
		    <TableBody>
		      {tableRows}
		    </TableBody>
		</Table>
	);
}

const TableList = (props)=>{
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// handler when delete button is clicked
	const handleDelete = (event, deleteId)=>{
		setDeleteDialogOpen(true);
		setDeleteId(deleteId);
	}

	//handler when deletion is confirmed on dialog
	const onClose = (action)=>{
		setDeleteDialogOpen(false);
		if(action==='ok' && props.onDelete){
			props.onDelete(deleteId);
		}
	}



	return(
		<Fragment>
			<TableCard {...props} handleDelete={handleDelete} />
			<DeleteConfirmationDialog  open={deleteDialogOpen} onClose={onClose}/>
		</Fragment>
	)
}

export default TableList;