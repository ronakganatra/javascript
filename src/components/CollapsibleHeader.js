import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { SVGIcon } from "./SVGIcon";
import defaults from "../config/defaults.json";

const CollapsibleHeaderContainer = styled.div`
	margin-top : ${ props => props.marginTop }px;
	background-color: ${ colors.$color_white };
	width: 100%;
`;

const CollapsibleHeading = styled.button`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background-color: ${ colors.$color_white };
	padding: ${ props => props.padding }px; 
	border: none;
	text-align: left;
	font-weight: ${ props => props.fontWeight };
	cursor: pointer;
	// When clicking, the button text disappears in Safari 10 because of color: activebuttontext.
	color: ${ colors.$color_black };

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 16px 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 16px;
	}

	svg {
		flex: 0 0 40px;
		// Compensate the SVGIcon width-viewbox size.
		margin-right: -10px;
		// Add some spacing between icon and text.
		margin-left: 10px;
		// Compensate the height difference with a line of text (32px).
		margin-top: -4px;
		margin-bottom: -4px;
		// Looks like Safari 10 doesn't like align-items: center for SVGs and needs some help.
		align-self: flex-start;

		@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		margin-top: 4px;
		margin-bottom: 4px;
		margin-right: -2px;
		}
	}
`;

const CollapsibleTitle = styled.span`
	flex: 1 1 auto;
	font-size: ${ props => props.fontSize }em;
	// Chrome needs 8 decimals to make this 32px without roundings.
	line-height: 1.33333333;
	// Looks like Safari 10 doesn't like align-items: center for SVGs and needs some help.
	align-self: center;
`;

export default class ListToggle extends React.Component {
	/**
	 * The constructor.
	 *
	 * @constructor
	 *
	 * @param {Object} props The props to use.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: this.props.isOpen,
		};

		this.toggleOpen = this.toggleOpen.bind( this );
	}

	/**
	 * Returns whether the list is collapsed.
	 *
	 * @returns {Boolean} True when the list is collapsed.
	 */
	isOpen() {
		return this.state.isOpen;
	}

	/**
	 * Toggles whether the list is collapsed.
	 *
	 * @returns {void}
	 */
	toggleOpen() {
		this.setState( {
			isOpen: ! this.state.isOpen,
		} );
	}

	/**
	 * Gets the correct arrow based on whether the list is collapsed or not.
	 *
	 * @returns {ReactElement} The upArrow when the header is collapsed, otherwise the downArrow.
	 */
	getArrow() {
		let upArrow = <SVGIcon><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></SVGIcon>;
		let downArrow = <SVGIcon><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></SVGIcon>;

		return this.isOpen() ? upArrow : downArrow;
	}

	/**
	 * Returns the rendered ListToggle element.
	 *
	 * @returns {ReactElement} The rendered ListToggle element.
	 */
	render() {
		let children = null;

		if ( this.state.isOpen ) {
			children = this.props.children;
		}

		// Styles for accountPage
		let marginTop = this.props.accountPage ? 0 : 24;
		let padding = this.props.accountPage ? 0 : "24px 32";
		let fontWeight = this.props.accountPage ? 400 : 300;
		let fontSize = this.props.accountPage ? 1.4 : 1.5;

		return (
			<CollapsibleHeaderContainer marginTop={ marginTop }>
				<CollapsibleHeading onClick={ this.toggleOpen } aria-expanded={ this.isOpen() } padding={ padding } fontWeight={ fontWeight }>
					<CollapsibleTitle fontSize={ fontSize }>
						{ this.props.title }
					</CollapsibleTitle>
					{ this.getArrow() }
				</CollapsibleHeading>
				{ children }
			</CollapsibleHeaderContainer>
		);
	}
}

ListToggle.propTypes = {
	accountPage: PropTypes.bool,
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ),
};

ListToggle.defaultProps = {
	isOpen: false,
};
