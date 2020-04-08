import React, {useState, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

import AuthorV1 from '../components/AuthorV1';

import {LOAD_ITEM_REQ, LOAD_ITEM_RES} from '../index';

class Article extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.loadItem(this.props.slug);
	}
	render(){
		console.log('Article',this.props);
		const {match, item, loadingItem, slug}=this.props;

		if(loadingItem){
			return(
				<span>Loading...</span>
			);
		}
		return(
			<div className='row'>
				<div className='col-12'>
					<h2 className='h3 mb-3'>{item.title}</h2>
					<div className='d-flex'>
						<AuthorV1 author={item.author} />
					</div>
					<Image image={item.image} />
					<Content parts={item.paragraphs} />
				</div>
			</div>
		);
	}
}

const Image = ({image})=>{
	if(!image){
		return '';
	}
	return(
		<div className='article-image my-3'>
			<img src={image.url} />
		</div>
	)
}

const Content = ({parts})=>{
	if(!parts || !parts.length){
		return '';
	}
	parts = parts.map((p,i)=>{
		return(
			<p>{p.content}</p>
		);
	});
	return(
		<div className='content'>
			{parts}
		</div>
	)
}



Article.propTypes={
	loadItem: PropTypes.func,
}

const mapStateToProps=(state)=>{
	const s=state.Article;
	return {
		item: s.item,
		loadingItem : s.loadingItem
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		loadItem:(articleSlug)=>{
			dispatch({
				type:LOAD_ITEM_REQ
			});
			const url = '/api/article/get?slug=' + articleSlug
			return fetch(url).then((res)=>{
				if(res.ok) return res.json();
				return {};
			}).then((item)=>{
				dispatch({
					type:LOAD_ITEM_RES,
					payload:{
						item
					}
				});
			});
		}
	}
}

export const ArticleContainer=connect(
	mapStateToProps,
	mapDispatchToProps
)(Article);

export default ArticleContainer;