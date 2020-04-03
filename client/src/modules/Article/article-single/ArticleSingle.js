import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Article from './Article';
import BackButton from '../components/BackButton';

class MainPage extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}
	render(){
		console.log('Article Single',this.props);
		//const {match, items, loadingItems, showDeleteDialog, onDelete, deleteDialogOpen, deleteId, header}=this.props;
		return(
			<div className='container py-5'>
				<div className='row'>
					<div className='col-12 col-md-8 m-auto'>
						<BackButton link={'/article'} className={'text-primary'}/>
						<Article slug={this.props.match.params.slug}/>
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

export const MainPageContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);

export default MainPageContainer;