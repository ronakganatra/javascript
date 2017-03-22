import React from "react";
import { RoundAddButton } from "../components/RoundButton";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";
import SitesNoResults from "../../public/images/SitesNoResults.svg";

const NoSitesResultContainer = styled.div`
	color: ${colors.$color_black};
	text-align: center;
`;

const NoSitesResultImage = styled.img`
	max-width: 100%;
	height: auto;
`;

/**
 * The SitesNoResult component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered component.
 * @constructor
 */
export default function SitesNoResult( props ) {
	return (
		<NoSitesResultContainer>
			<NoSitesResultImage src={ SitesNoResults } alt="" />
			<p>
				<FormattedMessage id="sites.no-site.notfound" defaultMessage={`We could not find
				{website} in your account.`} values={{ website: <strong>web.site</strong> }}/>
			</p>
			<p>
				<FormattedMessage id="sites.no-site.add" defaultMessage="Do you want to add it?"/>
			</p>
			<RoundAddButton onClick={ props.onClick } />
		</NoSitesResultContainer>
	);
}

SitesNoResult.propTypes = {
	onClick: React.PropTypes.func.isRequired,
};
