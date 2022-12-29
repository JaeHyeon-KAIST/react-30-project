import React from 'react';

function ImageBox(props) {
	return <div className="image-box">
		<img src={props.src} />
	</div>
}

export default ImageBox;