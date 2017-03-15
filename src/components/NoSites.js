import React from "react";
import { RoundAddButton } from "../components/RoundButton";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import noSiteImage from "../../public/images/nosites.png";
import { FormattedMessage } from "react-intl";

const NoSitesContainer = styled.div`
	color: ${colors.$color_black};
	text-align: center;

	& img {
		max-width: 100%;
		height: auto;
	}
`;

/**
 * The NoSites component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered component
 * @constructor
 */
export default function NoSites( props ) {
	return (
		<NoSitesContainer>
			<img src={ noSiteImage } alt="" />
			<p>
				<FormattedMessage id="sites.no-site.welcome" defaultMessage="Welcome to the sites overview" />
			</p>
			<p>
				<FormattedMessage id="sites.no-site.manage" defaultMessage={`Here you will be able to manage all your
sites that are running Yoast subscriptions.`} />
			</p>
			<p>
				<FormattedMessage id="sites.no-site.press-button" defaultMessage="Press the button below to add your first site."/>
			</p>
			<RoundAddButton onClick={ props.onClick } />
		</NoSitesContainer>
	);
}

NoSites.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	paragraphs: React.PropTypes.arrayOf( React.PropTypes.string ),
};

NoSites.defaultProps = {
	paragraphs: [],
};
