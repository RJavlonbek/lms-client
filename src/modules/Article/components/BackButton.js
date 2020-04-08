import React from 'react';
import {Link} from 'react-router-dom';
import {FaAngleLeft} from 'react-icons/fa';

const BackButton = ({link, className=''})=>{
	if(!link){
		return '';
	}
	return(
		<div className={className}>
			<Link to={link}>
				<FaAngleLeft /> Back to list
			</Link>
		</div>
	)
}

export default BackButton;