import React from "react";
import styled, { keyframes } from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";

import AddSiteModal from "./AddSiteModal";

import Sites from "./Sites";
import Search from "./Search";
import NoSites from "./NoSites";
import { RoundAddButton } from "./RoundButton";
import Loader from "yoast-components/composites/basic/Loader";
import "yoast-components/composites/basic/loader.scss";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

const animation = keyframes`
	0%   { transform: scale( 0.70 ); opacity: 0.4; }
	80%  { opacity: 1 }
	100%  { transform: scale( 0.95 ); opacity: 1 }
`;

let AnimatedLoader = styled( Loader )`
	animation: ${animation} 1.15s infinite;
	animation-direction: alternate;
	animation-timing-function: cubic-bezier(0.96, 0.02, 0.63, 0.86);
	width: 60px;
	height: 60px;
	margin: calc( 50% - 30px ) 0 0 calc( 50% - 30px )
`;

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class SitesPage extends React.Component {
	componentDidMount() {
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;
		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}

		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage }/>
		);

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
					{ modal }
				</div>
			);
		}
		return (
			<div>
				<NoSites onClick={ props.addSite }/>
				{ modal }
			</div>
		);
	}
}

export default injectIntl( SitesPage );

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	changeSearchQuery: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	intl: intlShape.isRequired,
	showLoader: React.PropTypes.bool,
};

SitesPage.defaultProps = {
	sites: [],
	popupOpen: false,
	errorMessage: "",
	showLoader: false,
};
