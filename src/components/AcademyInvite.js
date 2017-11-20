import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
// import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "./Button.js";
// import colors from "yoast-components/style-guide/colors.json";
// import validate from "validate.js";
// import defaults from "../config/defaults.json";
// import { speak } from "@wordpress/a11y";
// import _debounce from "lodash/debounce";
// import ErrorDisplay from "../errors/ErrorDisplay";
// import { ModalHeading } from "./Headings";

// const messages = defineMessages( {
// 	validationFormatEmail: {
// 		id: "validation.format.email",
// 		defaultMessage: "Please enter a valid email address.",
// 	},
// } );

const AcademyInviteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 1em;

	label {
		display: inline-block;
		font-weight: 300;
		font-size: 1em;
		margin: 16px 0 8px;
	}
`;
/*
const Buttons = styled.div`
	flex: 1 0 200px;
	padding: 8px 0;
	text-align: right;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

const ValidationText = styled.div`
	font-size: 1em;
	color: ${ colors.$color_red};
	margin: 1em 0;
	min-height: 1.8em;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );
*/

class AcademyInvite extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<AcademyInviteModal>
				<span>Testing testing</span>
			</AcademyInviteModal>
		);
	}
}

AcademyInvite.propTypes = {
	intl: intlShape.isRequired,
	linkingSiteUrl: PropTypes.string.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	onConnectClick: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	error: PropTypes.object,
};

export default injectIntl( AcademyInvite );
