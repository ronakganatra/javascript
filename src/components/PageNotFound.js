import React from "react";
import pageNotFoundImage from "../images/PageNotFound.svg";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import a11ySpeak from "a11y-speak";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const NotFoundHeading = styled.h1`
	font-weight: 500;
	font-size: 2.5em;
	margin: 0;
`;

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	img {
		width: 540px;
		max-width: 100%;
		height: auto;
		margin-top: 2em;
	}

	a {
		color: ${ colors.$color_blue };
	}
`;

const messages = defineMessages( {
	pageNotFound: {
		id: "page.notfound",
		defaultMessage: "Page not found",
	},
	suggestSitemap: {
		id: "page.suggestsitemap",
		defaultMessage: "Maybe this sitemap will help?",
	},
	suggestMenu: {
		id: "page.suggestmenu",
		defaultMessage: "Or pick one of the menu items. Those pages definitely still exist.",
	},
} );

/**
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
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
		let message = this.props.intl.formatMessage( messages.pageNotFound );
		a11ySpeak( message );
	}

	render() {
		let paragraphs = [
			<FormattedMessage id="page.notfound.header" defaultMessage={ "{ oops }" }
							  values={ { oops: <NotFoundHeading> Oops. </NotFoundHeading> } } />,
			<FormattedMessage id="page.notfound" defaultMessage="I'm afraid the page you are looking for does not exist..." />,
			<FormattedMessage id="page.suggestsitemap" defaultMessage={ "Maybe this { sitemap } will help?" }
							  values={ { sitemap: <a href="https://my.yoast.com/sitemap.xml">sitemap</a> } } />,
			<FormattedMessage id="page.suggestmenu" defaultMessage="Or pick one of the menu items. Those pages definitely still exist."/> ];
		return (


		<PageContainer>
			<p>
				{ paragraphs.map( function( paragraph ) {
					return <p key={ paragraph.props.id }>{ paragraph }</p>;
				} ) }
			</p>
			<img src={ pageNotFoundImage } alt="" />
		</PageContainer>
		);
	}
}

export default injectIntl( PageNotFound );

PageNotFound.propTypes = {
	intl: intlShape.isRequired,
};
