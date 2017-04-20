import React from "react";
import Site from "./Site";
import { Table } from "./Tables";
import Paper from "./Paper";
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
			<Table role="list">
				{ props.sites.map( function( site ) {
					let onManageHandler = () => {
						props.onManage( site.id );
					};

					return <Site
						key={ site.id }
						siteIcon={ site.siteIcon }
						siteName={ site.siteName }
						activeSubscriptions={ site.activeSubscriptions }
						onClickManage={ onManageHandler }
					/>;
				} ) }
			</Table>
		</Paper>
	);
}

export default Sites;

Sites.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	onManage: React.PropTypes.func.isRequired,
};

Sites.defaultProps = {
	sites: [],
};
