import PropTypes from "prop-types";
import React from "react";
import Site from "./Site";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";
/**
 * Returns the rendered Sites component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
function Sites( props ) {
	return (
		<Paper>
			<ListTable>
				{ props.sites.map( function( site ) {
					let siteId = site.id;
					let onManageHandler = () => {
						props.onManage( site.id );
					};
					let activeRequest = props.activeRequests.byId[ site.id ];
					let request = activeRequest.configurationServiceRequest ? activeRequest.configurationServiceRequest : {};
					return <Site
						key={ site.id }
						siteId={ siteId }
						siteIcon={ site.siteIcon }
						siteName={ site.siteName }
						siteType={ site.siteType }
						activeSubscriptions={ site.activeSubscriptions }
						request={ request }
						plugins={ props.plugins }
						onClickManage={ onManageHandler }
					/>;
				} ) }
			</ListTable>
		</Paper>
	);
}

export default Sites;

Sites.propTypes = {
	sites: PropTypes.arrayOf( PropTypes.object ),
	activeRequests: PropTypes.object,
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onManage: PropTypes.func.isRequired,
};

Sites.defaultProps = {
	sites: [],
	plugins: [],
};
