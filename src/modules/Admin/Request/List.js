import React, {lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {LOAD_REQUESTS_REQ, LOAD_REQUESTS_RES, DELETE_RES} from './index';
import withTitle from '../withTitle';

const TableList = lazy(()=>import('../components/TableList'));

class List extends React.Component{
	componentDidMount(){
		const {requests, loadRequests}=this.props;
		if(!(requests && requests.length)){
			loadRequests();
		}
	}
	render(){
		console.log('Request List',this.props);
		const {match, requests, loadingRequests, onDelete, header}=this.props;
		return(
			<Suspense fallback={'Loading...'}>
				<TableList 
					loading={loadingRequests}
					columnNames={['Name', 'Email', 'Address', 'Description']}
					rows={requests.map((item, i)=>{
						return {
							_id: item._id,
							columns:[{
								text: item.name
							},{
								text: item.email
							},{
								text: item.address
							},{
								text: item.message
							}]
						};
					})}
					onDelete={onDelete}
					path={match ? match.path : '/admin/employees'}
					header={header}
					addItemText={'Add Employee'}
					searchBoxPlaceholder={'search employee'}
				/>
			</Suspense>
		);
	}
}

List.propTypes={
	name:PropTypes.string
}

const mapStateToProps=(state)=>{
	const s=state.Admin.Request
	return {
		...s
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		loadRequests:()=>{
			dispatch({
				type:LOAD_REQUESTS_REQ
			});
			return fetch('/api/request/get').then((res)=>res.ok?res.json():[]).then((requests)=>{
				dispatch({
					type:LOAD_REQUESTS_RES,
					payload:{
						requests
					}
				});
			});
		},
		onDelete:(deleteId)=>{
			var b={
				id:deleteId
			}
			return fetch('/api/request/delete',{
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
						payload:{request:json.data}
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

export default withTitle(ListContainer)('Employees');