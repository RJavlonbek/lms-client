import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

class PatientRegisterPage extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}
	render(){
		console.log('Patient registration',this.props);
		//const {match, items, loadingItems, showDeleteDialog, onDelete, deleteDialogOpen, deleteId, header}=this.props;
		return(
			<div className='container py-5'>
				<div className='row'>
					<div className='col-12 col-md-8'>
						Patient registration
					</div>
					<div className='col-4'>
						col-4
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	const s=state.Article;
	return {}
}

const mapDispatchToProps=(dispatch)=>{
	return {}
}

export const PageContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(PatientRegisterPage);

export default PageContainer;