import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "yoast-components/composites/basic/Loader";

const animation = keyframes`
	0%   { transform: scale( 0.70 ); opacity: 0.4; }
	80%  { opacity: 1 }
	100%  { transform: scale( 0.95 ); opacity: 1 }
`;

// Uses viewport height for modern browsers. 70px = half of loader height + 40px main container top padding.
let PulsingLoader = styled( Loader )`
	animation: ${animation} 1.15s infinite;
	animation-direction: alternate;
	animation-timing-function: cubic-bezier(0.96, 0.02, 0.63, 0.86);
	width: 60px;
	height: 60px;
	margin: calc( 50% - 30px ) 0 0 calc( 50% - 30px );
	margin: calc( 50vh - 70px ) 0 0 calc( 50% - 30px );
`;

class AnimatedLoader extends React.Component {
	render() {
		return <PulsingLoader />;
	}
}

export default AnimatedLoader;
