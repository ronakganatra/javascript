import React from "react";
import { RoundAddButton } from "../components/RoundButton";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";
import SitesNoResults from "../images/SitesNoResults.svg";

const NoSitesResultContainer = styled.div`
	color: ${ colors.$color_black };
	text-align: center;
	align: center;
	margin: 0;
	
`;

const NoSitesResultImage = styled.img`
	height: auto;
		
	@media screen and ( max-width: 400px ) { 
		max-width: 250px;
	}
	@media screen and ( min-width: 400px ) { 
		max-width: 384px;
	}
`;

/**
 * The SitesNoResult component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered component.
 */
export default function SitesNoResult( props ) {
	return (
		<NoSitesResultContainer>
			<p>
				<FormattedMessage id="sites.no-site.notfound" defaultMessage={ `We could not find
					{ website } in your account.` } values={ { website: <strong>web.site</strong> } } />
			</p>
			<p>
				<FormattedMessage id="sites.no-site.add" defaultMessage="Do you want to add it?" />
			</p>
			<div>
				<RoundAddButton onClick={ props.onClick } />
			</div>
			<NoSitesResultImage src={ SitesNoResults } alt="" />
		</NoSitesResultContainer>
	);
}

SitesNoResult.propTypes = {
	onClick: React.PropTypes.func.isRequired,
};
