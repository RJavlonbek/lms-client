import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

import ArticleItem from '../components/ArticleItem';

import {LOAD_ITEMS_REQ, LOAD_ITEMS_RES} from '../index';

class List extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {items, loadItems, shouldLoadItems}=this.props;
		if(shouldLoadItems){
			loadItems();
		}
	}
	render(){
		console.log('Articles List',this.props);
		const {match, items, loadingItems, showDeleteDialog, onDelete, deleteDialogOpen, deleteId, header}=this.props;

		let itemsToDisplay = items.map((article, i)=>{
			return(
				<ArticleItem article={article} /> 
			)
		});
		return(
			<div className='row'>
				{itemsToDisplay}
			</div>
		);
	}
}



List.propTypes={
	name:PropTypes.string
}

const mapStateToProps=(state)=>{
	const s=state.Article;
	return {
		items: s.items,
		shouldLoadItems: s.shouldLoadItems
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		loadItems:()=>{
			dispatch({
				type:LOAD_ITEMS_REQ
			});
			return fetch('/api/article/get').then((res)=>{
				if(res.ok) return res.json();
				return [];
			}).then((items)=>{
				dispatch({
					type:LOAD_ITEMS_RES,
					payload:{
						items
					}
				});
			});
		}
	}
}

export const ListContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(List);

export default ListContainer;