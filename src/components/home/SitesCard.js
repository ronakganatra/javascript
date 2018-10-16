import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import { linkSiteModalClose, linkSiteModalOpen,
	linkSite, updateSiteUrl } from "../../actions/sites";
import { LargeIconButton, makeButtonFullWidth } from "../Button";
import plus from "../../icons/plus.svg";
import addSiteImage from "../../images/addsite.svg";
import AddSiteModal from "../modal/AddSiteModal";
import { push } from "react-router-redux";

const messages = defineMessages( {
	addSite: {
		id: "home.sitecard.addsitebutton",
		defaultMessage: "Add site",
	},
} );

const ActionBlock = styled.div`
	margin-top: 18px;
	text-align: center;
`;

const Header = styled.h2`
	padding: 0;
	margin: 16px 0;
	color: ${ colors.$color_pink_dark };
	font-weight: 300;
	font-size: 1.5em;
	text-decoration: none;
`;

const Details = styled.div`
	border-bottom: 1px ${ colors.$color_grey } solid;
	flex-grow: 1;
`;

const AddSiteImage = styled.img`
	display: block;
	max-width: 100%;
	margin: 0 auto;
	margin-bottom: 16px;
	padding: 0 40px;
`;

const ResponsiveIconButton = makeButtonFullWidth( LargeIconButton );

/**
 * A function that returns the SitesCard component.
 *
 * @param {Object} props The props required for the SitesCard.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
const SitesCard = ( props ) => {
	return (
		<Fragment>
			<Details>
				<Header>
					<FormattedMessage id={ "home.sitecard.header" } defaultMessage={ "Add site" } />
				</Header>
				<p>
					<FormattedMessage
						id={ "home.addSiteInfo" }
						defaultMessage={ "Add a website to your account to manage your " +
						"subscriptions and get insights about your website!" }
					/>
				</p>
				<AddSiteImage src={ addSiteImage } alt="" />
				<AddSiteModal { ...props } />
			</Details>
			<ActionBlock>
				<ResponsiveIconButton
					onClick={ props.onClick }
					iconSource={ plus }
					aria-label={ props.intl.formatMessage( messages.addSite ) }
				>
					<FormattedMessage
						id={ messages.addSite.id }
						defaultMessage={ messages.addSite.defaultMessage }
					/>
				</ResponsiveIconButton>
			</ActionBlock>
		</Fragment>
	);
};

SitesCard.propTypes = {
	intl: intlShape.isRequired,
	onClick: PropTypes.func.isRequired,
	navigateToSites: PropTypes.func,
};

export const mapStateToProps = ( state ) => {
	const modalOpen = state.ui.sites.addSiteModalOpen;

	const errorFound = state.ui.sites.linkSiteFailed;

	const error = state.ui.sites.linkSiteError;

	const linkingSiteUrl = state.ui.sites.linkingSiteUrl;

	return {
		modalOpen,
		errorFound,
		error,
		linkingSiteUrl,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: () => {
			dispatch( linkSiteModalOpen() );
		},
		addSite: ( url ) => {
			dispatch( linkSiteModalOpen() );
			dispatch( updateSiteUrl( url ) );
		},
		onClose: () => {
			dispatch( linkSiteModalClose() );
		},
		onConnect: ( url, type ) => {
			dispatch( linkSite( url, type, true ) );
		},
		onChange: ( url ) => {
			dispatch( updateSiteUrl( url ) );
		},
		navigateToSites: () => {
			dispatch( push( "/sites" ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const url = stateProps.linkingSiteUrl;

	const onConnect = ( type, fromHome ) => {
		dispatchProps.onConnect( url, type, fromHome );
	};

	const addSite = () => {
		dispatchProps.addSite( url );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onConnect, addSite } );
};

const SitesCardContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( SitesCard );

export default injectIntl( SitesCardContainer );
