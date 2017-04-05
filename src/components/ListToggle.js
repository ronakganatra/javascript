import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { SVGIcon } from "./SVGIcon";

const CollapsibleHeaderContainer = styled.div`
	margin-top: 20px;
`;

const CollapsibleHeader = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 40px;
	border: none;
	background-color: white;
	cursor: pointer; ////////////////////////////////////////////// not working

	h2 {
		font-weight: 500;
		font-size: 1.5em;
	}
`;

const ListToggleBody = styled.ul`
	padding: 0;
	margin: 0;
	
	li:nth-child(odd) {
		background-color: ${colors.$color_background_light};
	}
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
	 * Gets the list when it is collapsed.
	 *
	 * @returns {ReactElement} The list.
	 */
	getList() {
		let body;

		if ( this.isOpen() ) {
			body = <ListToggleBody>{ this.props.items }</ListToggleBody>;
		}

		return body;
	}

	/**
	 * Returns the rendered ListToggle element.
	 *
	 * @returns {ReactElement} The rendered ListToggle element.
	 */
	render() {
		return (
			<CollapsibleHeaderContainer>
				<CollapsibleHeader onClick={ this.toggleOpen }>
					<h2>{ this.props.title }</h2>
					{ this.getArrow() }
				</CollapsibleHeader>
				{ this.getList() }
			</CollapsibleHeaderContainer>
		);
	}
}

ListToggle.propTypes = {
	title: React.PropTypes.string.isRequired,
	items: React.PropTypes.any.isRequired
	isOpen: React.PropTypes.bool,
};

ListToggle.defaultProps = {
	isOpen: false,
};
