import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const ToggleBar = styled.div`
	background-color: ${ props => props.isEnabled ? colors.$color_blue_light : colors.$color_button_border }
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
	background-color: ${ props => props.isEnabled ? colors.$color_blue : colors.$color_grey_medium_dark }
	margin-left: ${ props => props.isEnabled ? "12px" : "-2px" }
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 100%;
	height: 20px;
	width: 20px;
	position: absolute;
	margin-top: -3px;
`;

const ToggleVisualLabel = styled.span`
	padding: 6px 0;
	font-size: 14px;
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

		this.setEnablement = this.setEnablement.bind( this );

		console.log( props.isEnabled );

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
			<ToggleBar isEnabled={this.isEnabled()} onClick={this.setEnablement} onKeyDown={this.setEnablement} tabIndex="0"
				role="checkbox" aria-label={this.props.ariaLabel} aria-checked={this.isEnabled()}
			>
				<ToggleBullet isEnabled={this.isEnabled()} />
			</ToggleBar>
			<ToggleVisualLabel aria-hidden="true">{ this.isEnabled() ? "On" : "Off" }</ToggleVisualLabel>
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

		let newState = ! this.isEnabled();

		this.setState( {
			isEnabled: newState,
		} );

		this.props.onSetEnablement( newState );
	}
}

Toggle.propTypes = {
	isEnabled: React.PropTypes.bool,
	ariaLabel: React.PropTypes.string.isRequired,
	onSetEnablement: React.PropTypes.func,
};

Toggle.defaultProps = {
	isEnabled: false,
	onSetEnablement: () => {},
};

export default Toggle;
