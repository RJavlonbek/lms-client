import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

import {LOAD_ITEMS_REQ, LOAD_ITEMS_RES, DELETE_RES} from './index';
import {ALERT} from '../index'; 
import withTitle from '../withTitle';

const TableList = lazy(()=>import('../components/TableList'));

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
			<Suspense fallback={'Loading...'}>
				<TableList
					loading={loadingItems}
					columnNames={['Article', 'Title', 'Category', 'Author']}
					rows={items.map((item, i)=>{
						return {
							_id: item._id,
							columns:[{
								type:'image',
								url: item.image ? item.image.url : ''
							},{
								text: item.title
							},{
								text: item.category.map((c,i)=>c.name).join(',')
							},{
								text: item.author ? item.author.name : 'Blogger'
							}]
						}
					})}
					path={match ? match.path : '/admin/articles'}
					onDelete={onDelete}
					addItemText={'Add Article'}
				/>
			</Suspense>
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

				dispatch({
					type: ALERT,
					payload:{
						type:'error',
						text: 'Connection with server failed...'
					}
				});
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

export default withTitle(ListContainer)('Articles');