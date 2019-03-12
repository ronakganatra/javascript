import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl, defineMessages } from "react-intl";
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

const messages = defineMessages( {
	currentProgress: {
		id: "progressBar.currentProgress",
		defaultMessage: "current progress",
	},
} );

class ProgressBar extends React.Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const progress = Math.min( this.props.progress, 100 );
		const textColor = progress < 100 ? colors.$color_black : colors.$color_white;
		const ariaLabel = this.props.intl.formatMessage( messages.currentProgress );

		return <Bar>
			<ProgressText textColor={ textColor } aria-label={ ariaLabel }>{ progress }%</ProgressText>
			<Progress progress={ progress } />
		</Bar>;
	}
}

export default injectIntl( ProgressBar );

ProgressBar.propTypes = {
	intl: intlShape.isRequired,
	progress: PropTypes.number,
};

ProgressBar.defaultProps = {
	progress: 0,
};
