import React from 'react';

const Image = ({image, className=''})=>{
	if(!image){
		return '';
	}
	return(
		<div className={'bg-image ' + className} style={{backgroundImage: 'url('+image.url+')'}}>
		</div>
	)
}

export default Image;