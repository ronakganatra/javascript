import React from "react";
import pageNotFoundImage from "../images/PageNotFound.svg";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import styled from "styled-components";
import { Heading } from "./Headings";

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	img {
		width: 384px;
		max-width: 100%;
		height: auto;
		margin-top: 2em;
	}
`;

const messages = defineMessages( {
	pageNotFound: {
		id: "page.notfound",
		defaultMessage: "Page not found",
	},
} );

/**
 * A function that returns the Page Not Found component.
 *
 * @returns {ReactElement} The component that contains the Page Not Found page.
 */
class PageNotFound extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.pageNotFound );
		speak( message );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const paragraphs = [
			<FormattedMessage id="page.notfound" defaultMessage="I'm afraid the page you are looking for does not exist..." />,
		];
		return (


			<PageContainer>
				<Heading><FormattedMessage id="page.notfound.header" defaultMessage={ "Oops" } /></Heading>
				{ paragraphs.map( function( paragraph ) {
					return <p key={ paragraph.props.id }>{ paragraph }</p>;
				} ) }
				<img src={ pageNotFoundImage } alt="" />
			</PageContainer>
		);
	}
}

export default injectIntl( PageNotFound );

PageNotFound.propTypes = {
	intl: intlShape.isRequired,
};
