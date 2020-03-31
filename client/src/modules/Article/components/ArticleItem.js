import React from 'react';
import {Link} from 'react-router-dom';
import {
	FiBookmark,
	FiMoreHorizontal
} from 'react-icons/fi';

const ArticleItem = ({article})=>{
	return(
		<div className='article-item article-item-v1 col-12 d-flex mb-3'>
			<div className='content-box'>
				<span className="text-uppercase reason-text">Recommended for you</span>
				<Link to={'/article/'+article.slug}>
					<h2 className='h5 title'>{article.title}</h2>
				</Link>
				<Link to={'/article/'+article.slug}>
					<p className='subtitle'>{article.subtitle}</p>
				</Link>
				<div className='d-flex align-items-center'>
					<div className='flex-1'>
						<div className='author'>
							<span className="author-name">Vigo Webs </span>
							<span className="author-group">in The Ascend </span>
						</div>
						<div className='fs-12'>
							<span className='date'>Mar 31, 2020</span>
							<span className='dot-separator px-1'></span>
							<span className='read-time'>8 min read </span>
						</div>
					</div>
					<span className='bookmark-button mr-2'>
						<FiBookmark />
					</span>
					<span className='actions-button'>
						<FiMoreHorizontal />
					</span>
				</div>
			</div>
			<div className='image-box' style={{backgroundImage: 'url('+article.image.url+')'}}>
				
			</div>
		</div>
	);
}

export default ArticleItem;