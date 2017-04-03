import React from "react";
import styled from "styled-components";

import AddSiteModal from "./AddSiteModal";

import Sites from "./Sites";
import Search from "./Search";
import NoSites from "./NoSites";
import { RoundAddButton } from "./RoundButton";

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
	if ( props.sites.length > 0 ) {
		return (
			<div>
				<SiteAddContainer>
					<Search
						id="search"
						description="The search results will be updated as you type."
						descriptionId="searchDescription"
						onChange={ props.changeSearchQuery }
					/>
					<RoundAddButton onClick={ props.addSite }/>
				</SiteAddContainer>
				<Sites sites={ props.sites } onClick={ ( sitesId ) => {
					return sitesId;
				} }/>
				<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose } onChange={ props.onChange } />
			</div>
		);
	}
	return (
		<div>
			<NoSites onClick={ props.addSite } />
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose } onChange={ props.onChange } />
		</div>
	);
}

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	changeSearchQuery: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
};

SitesPage.defaultProps = {
	sites: [],
	popupOpen: false,
};
