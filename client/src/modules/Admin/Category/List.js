import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

import {LOAD_ITEMS_REQ, LOAD_ITEMS_RES, DELETE_RES} from './index';
import withTitle from '../withTitle';

const TableList = lazy(()=>import('../components/TableList'));

class List extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {items, loadItems}=this.props;
		if(!(items && items.length)){
			loadItems();
		}
	}
	render(){
		console.log('Category List',this.props);
		const {match, items, loadingItems, showDeleteDialog, onDelete, deleteDialogOpen, deleteId, header}=this.props;
		return(
			<Suspense fallback={'Loading...'}>
				<TableList
					columnNames={['Name']}
					rows={items.map((item, i)=>{
						return {
							_id:item._id,
							columns:[{
								text: item.name
							}]
						}
					})}
					path={match ? match.path : '/admin/categories'}
					header={header}
					onDelete={onDelete}
					addItemText={'Add Category'}
					searchBoxPlaceholder={'search category'}
				/>
			</Suspense>
		);
	}
}



List.propTypes={
	name:PropTypes.string
}

const mapStateToProps=(state)=>{
	const s=state.Admin.Category
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
			return fetch('/api/category/get').then((res)=>res.ok?res.json():[]).then((items)=>{
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
			return fetch('/api/category/delete',{
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

export default withTitle(ListContainer)('Categories');