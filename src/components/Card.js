import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import sampleHeader from "../images/sample_course_card_header.png";
import Banner from "./Banner";

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: ${ colors.$color_white };
	width: 100%;
	list-style-type: none;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
`;

const Header = styled.a`
	text-decoration: none;
`;

const HeaderTitle = styled.span`
	display: block;
	padding: 8px 18px 0;
	color: ${ colors.$color_pink_dark };
	font-size: 1.5em;
	font-weight: 300;
`;

const HeaderImage = styled.img`
	width: 100%;
`;

const Content = styled.div`
	margin: 0;
	padding: 0 18px 18px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

/**
 * Returns the Card component.
 *
 * @returns {ReactElement} The Card component.
 */
class Card extends React.Component {
	/**
	 * Returns the header image and the title, either with a link to the course if it is present,
	 * or not if it is not.
	 * @returns {React.Component} the header image
	 */
	getHeader() {
		if ( ! this.props.header ) {
			return null;
		}

		if ( this.props.header.link ) {
			return (
				<Header href={ this.props.header.link }>
					<HeaderImage src={ this.props.header.image || sampleHeader } alt="" />
					<HeaderTitle>{ this.props.header.title }</HeaderTitle>
				</Header>
			);
		}

		return (
			<span>
				<HeaderImage src={ this.props.header.image || sampleHeader } alt="" />
				<HeaderTitle>{ this.props.header.title }</HeaderTitle>
			</span>
		);
	}

	/**
	 * Gets the banner if a banner text is provided.
	 *
	 * @returns {React.Component} the banner or null.
	 */
	getBanner() {
		if ( ! this.props.banner ) {
			return null;
		}
		return (
			<Banner { ...this.props.banner }>
				{ this.props.banner.text }
			</Banner>
		);
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Container className={ this.props.className } id={ this.props.id }>
				{ this.getHeader() }
				{ this.getBanner() }
				<Content>
					{ this.props.children }
				</Content>
			</Container>
		);
	}
}

export default injectIntl( Card );

export const FullHeightCard = injectIntl( styled( Card )`
	height: 100%;
` );

Card.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	header: PropTypes.shape( {
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
		link: PropTypes.string,
	} ),
	banner: PropTypes.shape( {
		text: PropTypes.string,
		textColor: PropTypes.string,
		backgroundColor: PropTypes.string,
	} ),
	children: PropTypes.any.isRequired,
};

Card.defaultProps = {
	className: "",
	id: null,
	header: PropTypes.shape( {
		image: null,
		link: null,
	} ),
	banner: null,
};
