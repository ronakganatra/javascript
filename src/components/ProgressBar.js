import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";

const Bar = styled.div`
	position: relative;
		
	background-color: ${ colors.$color_grey };	
	border-radius: 5px;
	text-align: right;
`;

const Progress = styled.div`
	width: ${ props => props.progress }%;
	height: 25px;
	
	background-color: ${ colors.$color_green };
	border-radius: 5px;
`;

const ProgressText = styled.span`	
	position: absolute;
	right: 10px;
	
	line-height: 25px;
		
	font-size: 0.75em;
	font-weight: bold;
	color: ${ props => props.textColor };
`;

export default class ProgressBar extends React.Component {

	render() {
		let progress = Math.min( this.props.progress, 100 );
		let textColor = progress < 100 ? colors.$color_black : colors.$color_white;
		return <Bar>
			<ProgressText textColor={ textColor }>{ progress }%</ProgressText>
			<Progress progress={ progress } />
		</Bar>;
	}
}

ProgressBar.propTypes = {
	progress: PropTypes.number,
};

ProgressBar.defaultProps = {
	progress: 0,
};
