import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const ToggleBar = styled.div`
	background-color: ${ props => props.isEnabled ? colors.$color_blue_light : colors.$color_button_border }
	border-radius: 7px;
	height: 14px;
	width: 30px;
	cursor: pointer;
`;

const ToggleBullet = styled.span`
	background-color: ${ props => props.isEnabled ? colors.$color_blue : colors.$color_marker_disabled }
	margin-left: ${ props => props.isEnabled ? "12px" : "-2px" }
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 100%;
	height: 20px;
	width: 20px;
	position: absolute;
	margin-top: -3px;
`;

const ToggleLabel = styled.label`
	padding: 6px 0;
	font-size: 14px;
	width: 30px;
	text-align: center;
	cursor: pointer;
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

		this.state = {
			isEnabled: this.props.isEnabled,
		};
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {XML} The rendered html.
	 */
	render() {
		return <div onClick={this.setEnablement}>
			<ToggleBar isEnabled={this.isEnabled()}>
				<ToggleBullet isEnabled={this.isEnabled()} />
			</ToggleBar>
			<ToggleLabel>{ this.isEnabled() ? "On" : "Off" }</ToggleLabel>
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
	 * @returns {void}
	 */
	setEnablement() {
		this.setState(
			{
				isEnabled: ! this.isEnabled(),
			}
		);
	}
}

Toggle.propTypes = {
	isEnabled: React.PropTypes.bool,
};

Toggle.defaultProps = {
	isEnabled: false,
};

export default Toggle;
