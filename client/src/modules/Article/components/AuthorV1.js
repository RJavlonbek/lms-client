import React from 'react';
import {
	IoMdStar as StarIcon
} from 'react-icons/io';

import Image from './Image';


const AuthorV1 = ({author}) =>{
	if(!author){
		return '';
	}
	return(
		<div className='author-v1 d-flex align-items-center'>
			<div className='author-image-box mr-2'>
				<Image className='author-image rounded-circle' image={author.image} />
			</div>
			<div className='mr-2'>
				<div className='d-flex align-items-center mb-1'>
					<h2 className='h6 m-0 mr-2'>{author.name}</h2>
					<div className='btn btn-sm py-0 border rounded'> Follow </div>
				</div>
				<div className='text-faded text-small'>
					<span>Feb 2 </span> 
					<span className='dot-separator'></span> 
					<span> 5 min read</span>
					<span className='star'> <StarIcon /></span>
				</div>
			</div>
		</div>
	);
}

export default AuthorV1;