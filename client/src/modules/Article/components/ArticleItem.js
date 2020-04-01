import React from 'react';
import {Link} from 'react-router-dom';
import {
	FiBookmark,
	FiMoreHorizontal
} from 'react-icons/fi';
import {
	Popover,
	PopoverBody
} from 'reactstrap';

const ArticleItem = ({article})=>{
	return(
		<div className='article-item article-item-v1 col-12 d-flex mb-3'>
			<div className='content-box'>
				<span className="text-uppercase reason-text">Recommended for you</span>
				<Link to={'/article/'+article.slug}>
					<h2 className='h5 title'>{article.title}</h2>
				</Link>
				<Subtitle link={'/article/'+article.slug} subtitle={article.subtitle} />
				<div className='d-flex align-items-center'>
					<div className='flex-1'>
						<Author author={article.author} />
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

const Author = ({author}) =>{
	const [popoverOpen, setPopoverOpen] = React.useState(false);
	if(!author){
		return '';
	}
	return(
		<div className='author'>
			<span id={author.slug} className={"author-name"} dataToggle='tooltip' title={author.name}>{author.name} </span>
			<span className="author-group">in The Ascend </span>
			<Popover 
				placement='top' 
				isOpen={popoverOpen} 
				target={author.slug} 
				toggle={()=>setPopoverOpen(!popoverOpen)}
				trigger={'hover'}
			>
				<PopoverBody>
					<div className='d-flex'>
						<div className='flex-1 mr-2'>
							<h2 className='h6'>{author.name}</h2>
							<p className='author-description text-faded'>{author.description}</p>
						</div>
						<div className='author-image-box'>
							<div className='author-image' style={{backgroundImage: 'url(' + author.image.url + ')'}}></div>
						</div>
					</div>
				</PopoverBody>
			</Popover>
		</div>
	)
}

const Subtitle = ({subtitle, link}) =>{
	if(!subtitle){
		return '';
	}
	return(
		<Link to={link}>
			<p className='subtitle mb-2 text-faded'>{subtitle}</p>
		</Link>
	)
}
export default ArticleItem;