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
					const onManageHandler = () => {
						props.onManage( site.id );
					};

					return <Site
						key={ site.id }
						siteIcon={ site.siteIcon }
						siteName={ site.siteName }
						siteType={ site.siteType }
						activeSubscriptions={ site.activeSubscriptions }
						linkedConfigurationServiceRequest={ site.configurationServiceRequest }
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
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onManage: PropTypes.func.isRequired,
};

Sites.defaultProps = {
	sites: [],
	plugins: [],
};
