import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {LOAD_ITEMS_REQ, LOAD_ITEMS_RES, DELETE_RES} from './index';

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
		return(
			<div className='m-4'>
				Main PAge
			</div>
		);
	}
}



List.propTypes={
	name:PropTypes.string
}

const mapStateToProps=(state)=>{
	const s=state.Admin.Article;
	return {
		...s
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
		},
		onDelete:(deleteId)=>{
			var b={
				id:deleteId
			}
			return fetch('/api/article/delete',{
				method:'POST',
				body:JSON.stringify(b),
				headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			    }
			}).then((res)=>res.ok?res.json():{}).then((json)=>{
				if(json.result && json.result==='success'){
					dispatch({
						type:DELETE_RES,
						payload:{item:json.data}
					});
				}
			});
		}
	}
}

export const ListContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(List);

export default ListContainer;