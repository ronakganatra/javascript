import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { defineMessages, injectIntl, intlShape } from "react-intl";

const messages = defineMessages( {
	toggleLabelOn: {
		id: "togglelabel.on",
		defaultMessage: "On",
	},
	toggleLabelOff: {
		id: "togglelabel.off",
		defaultMessage: "Off",
	},
} );

const ToggleBar = styled.div`
	background-color: ${ props => props.isEnabled ? "#a5d6a7" : colors.$color_button_border };
	border-radius: 7px;
	height: 14px;
	width: 30px;
	cursor: pointer;
	margin: 0;
	outline: 0;
	&:focus > span {
		box-shadow: inset 0 0 0 1px ${colors.$color_white}, 0 0 0 1px #5b9dd9, 0 0 2px 1px rgba(30, 140, 190, .8);
	}
`;

const ToggleBullet = styled.span`
	background-color: ${ props => props.isEnabled ? colors.$color_green_medium_light : colors.$color_grey_medium_dark };
	margin-left: ${ props => props.isEnabled ? "12px" : "-2px" };
	box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 100%;
	height: 20px;
	width: 20px;
	position: absolute;
	margin-top: -3px;
`;

const ToggleVisualLabel = styled.span`
	padding: 6px 0 0;
	font-size: 14px;
	line-height: 20px;
	width: 30px;
	text-align: center;
	display: inline-block;
	margin: 0;
`;

class Toggle extends React.Component {
	/**
	 * Sets the toggle object.
	 *
	 * @param {Object} props The props to use.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.onClick = this.props.onToggleDisabled;

		if ( props.disable !== true ) {
			this.onClick = this.setEnablement.bind( this );
		}

		this.state = {
			isEnabled: this.props.isEnabled,
		};
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return <div>
			<ToggleBar
				isEnabled={ this.isEnabled() } onClick={ this.onClick } onKeyDown={ this.setEnablement } tabIndex="0"
				role="checkbox" aria-label={ this.props.ariaLabel } aria-checked={ this.isEnabled() }
			>
				<ToggleBullet isEnabled={ this.isEnabled() } />
			</ToggleBar>
			<ToggleVisualLabel aria-hidden="true">
				{ this.isEnabled() ? this.props.intl.formatMessage( messages.toggleLabelOn ) : this.props.intl.formatMessage( messages.toggleLabelOff ) }
			</ToggleVisualLabel>
		</div>;
	}

	/**
	 * Returns the current enablement state.
	 *
	 * @returns {boolean} The current enablement state.
	 */
	isEnabled() {
		return this.state.isEnabled;
	}

	/**
	 * Sets the state to the opposite of the current state.
	 *
	 * @param {object} evt React SyntheticEvent.
	 * @returns {void}
	 */
	setEnablement( evt ) {
		// Makes the toggle actionable with the Space bar key.
		if ( evt.type === "keydown" && evt.which !== 32 ) {
			return;
		}

		const newState = ! this.isEnabled();

		this.setState( {
			isEnabled: newState,
		} );

		this.props.onSetEnablement( newState );
	}
}

Toggle.propTypes = {
	isEnabled: PropTypes.bool,
	ariaLabel: PropTypes.string.isRequired,
	onSetEnablement: PropTypes.func,
	disable: PropTypes.bool,
	onToggleDisabled: PropTypes.func,
	intl: intlShape.isRequired,
};

Toggle.defaultProps = {
	isEnabled: false,
	onSetEnablement: () => {},
};

export default injectIntl( Toggle );
