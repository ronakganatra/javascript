import React from "react";
import styled from "styled-components";

import Sites from "./Sites";
import Search from "./Search";
import { RoundAddButton } from "./RoundButton";

const SitesPageContainer = styled.div`
`;

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
export default function SitesPage( props ) {
	return (
		<SitesPageContainer sites={ props.sites } { ...props.addSite } { ...props.changeSearchQuery }>
			<SiteAddContainer>
				<Search
					id="search"
					description="The search results will be updated as you type."
					descriptionId="searchDescription"
				/>
				<RoundAddButton />
			</SiteAddContainer>
			<Sites sites={ props.sites } onClick={ ( sitesId ) => {
				return sitesId;
			} } />
		</SitesPageContainer>
	);
}

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	changeSearchQuery: React.PropTypes.func.isRequired,
};

SitesPage.defaultProps = {
	sites: [],
};
