import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import { LargeButtonLink, makeButtonFullWidth } from "../Button";
import { retrieveFeed } from "../../actions/home";
import Loader from "../Loader";

const ActionBlock = styled.div`
	text-align: center;
`;

const Header = styled.h2`
	padding: 0;
	margin: 0;
	margin-bottom: 15px;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const Details = styled.div`
	margin: 24px 0;
	border-bottom: 1px ${ colors.$color_grey } solid;
	flex-grow: 1;
`;

const WordpressFeedList = styled.ul`
	margin: 0;
	list-style: none;
	padding: 0;
`;

const WordpressFeedLink = styled.a`
	display: inline-block;
	padding-bottom: 4px;
`;

const A11yNotice = styled.span`
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute !important;
	width: 1px;
	word-wrap: normal !important;
`;

const WordpressFeedListItemContainer = styled.li`
	margin: 8px 0;
	overflow: hidden;
`;

const FeedDescription = styled.p`
	margin-top: 0;
`;


/**
 * A WordpressFeedList item.
 *
 * @param {object} props The props needed to create the WordpressFeedList item
 *
 * @returns {ReactElement} The WordpressFeedList item
 */
const WordpressFeedListItem = ( props ) => {
	return (
		<WordpressFeedListItemContainer>
			<WordpressFeedLink
				href={ props.link }
				target="_blank"
				rel="noopener noreferrer"
			>
				{ props.title }
				<A11yNotice>
					( Opens in a new browser tab )
				</A11yNotice>
			</WordpressFeedLink>
			<FeedDescription>
				{ props.description }
			</FeedDescription>
		</WordpressFeedListItemContainer>
	);
};

WordpressFeedListItem.propTypes = {
	link: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
};

/**
 * The WordpressFeedList.
 *
 * @param {object} props The props needed to create the WordpressFeedList
 *
 * @returns {ReactElement} The WordpressFeedList
 */
const getFeedList = ( props ) => {
	return (
		<WordpressFeedList
			role="list"
		>
			{ props.items.map( item => (
				<WordpressFeedListItem
					key={ item.title }
					title={ item.title }
					link={ item.link }
					description={ item.description } />
			) ) }
		</WordpressFeedList>
	);
};

getFeedList.propTypes = {
	items: PropTypes.array,
};

let ResponsiveButtonLink = makeButtonFullWidth( LargeButtonLink );

/**
 * A function that returns the SitesCard component.
 *
 * @param {Object} props The props required for the SitesCard.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
class BlogContent extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.props.getFeed();
	}

	render() {
		if( this.props.retrievingFeed ) {
			return <Loader />;
		}
		return(
			<Fragment>
				<Details>
					<Header>
						<FormattedMessage id={"home.blogcard.header"} defaultMessage={"Learn more about SEO"}/>
					</Header>
					{ getFeedList( this.props.blogFeed ) }
				</Details>
				<ActionBlock>
					<ResponsiveButtonLink
						to="https://yoast.com/seo-blog/"
						linkTarget="_blank"
					>
						<FormattedMessage
							id={"home.blogcard.blogbutton"}
							defaultMessage="SEO blog"
						/>
					</ResponsiveButtonLink>
				</ActionBlock>
			</Fragment>
		);
	}
}

BlogContent.propTypes = {
	getFeed: PropTypes.func,
	retrievingFeed: PropTypes.bool,
	blogFeed: PropTypes.object,
	errorFound: PropTypes.bool,
	error: PropTypes.object,
	intl: intlShape.isRequired,
};


export const mapStateToProps = ( state ) => {
	let blogFeed = state.ui.home.blogFeed;

	let errorFound = state.ui.home.blogFeedErrorFound;
	let error = state.ui.home.blogFeedError;
	let retrievingFeed = state.ui.home.retrievingFeed;

	return {
		blogFeed,
		retrievingFeed,
		errorFound,
		error,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		getFeed: () => {
			// Currently, this number doesn't do anything, because the feed at yoast.com/feed/widget is restrained to two posts.
			dispatch( retrieveFeed( 3 ) );
		},
	};
};

const BlogFeed = connect(
	mapStateToProps,
	mapDispatchToProps
)( BlogContent );

export default injectIntl( BlogFeed );
