import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { SVGIcon } from "./SVGIcon";
import defaults from "../config/defaults.json";

const CollapsibleHeaderContainer = styled.div`
	margin-top: 20px;
	background-color: ${ colors.$color_white };
`;

const CollapsibleHeading = styled.button`
	width: 100%;
	background-color: ${ colors.$color_white };
	padding: 16px 32px 0 24px;
	border: none;
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 16px 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 16px;
	}

	span {
		flex: 1 1 auto;
		font-weight: 300;
	}

	svg {
		min-width: 40px;
		align-self: center;

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			min-width: 0;
		}
	}
`;

const CollapsibleTitle = styled.span`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 0;
	border: none;
	font-size: 1.5em;
	background-color: ${ colors.$color_white };
	cursor: pointer;
	text-align: left;
`;

const CollapsibleSubTitle = styled.span`
	display: flex;
	margin-top: 0px;
	padding-top: 0px;
	padding-bottom: 12px;
	font-size: 0.9em;
	width: 100%;
	text-align: left;
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
		if ( this.props.subtitle ) {
			return (
			<CollapsibleHeaderContainer>
					<CollapsibleHeading onClick={ this.toggleOpen } aria-expanded={ this.isOpen() }>
						<CollapsibleTitle>
						<span>{ this.props.title }</span>
						{ this.getArrow() }
						</CollapsibleTitle>
							<CollapsibleSubTitle>{ this.props.subtitle }</CollapsibleSubTitle>
					</CollapsibleHeading>
					{ children }
			</CollapsibleHeaderContainer>
			);
		}
		if ( ! this.props.subtitle ) {
			return (
				<CollapsibleHeaderContainer>
					<CollapsibleHeading onClick={ this.toggleOpen } aria-expanded={ this.isOpen() }>
						<CollapsibleTitle>
							<span>{ this.props.title }</span>
							{ this.getArrow() }
						</CollapsibleTitle>
					</CollapsibleHeading>
					{ children }
				</CollapsibleHeaderContainer>
			);
		}
	}
}

ListToggle.propTypes = {
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string,
	isOpen: React.PropTypes.bool,
	children: React.PropTypes.oneOfType( [
		React.PropTypes.arrayOf( React.PropTypes.node ),
		React.PropTypes.node,
	] ),
};

ListToggle.defaultProps = {
	isOpen: false,
};
