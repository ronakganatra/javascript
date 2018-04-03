import React, { Fragment } from "react";
import CustomersResult from "./CustomersResult";
import OrdersResult from "./OrdersResult";
import BaseResult from "./BaseResult";
import SitesResult from "./SitesResult";
import SubscriptionsResult from "./SubscriptionsResult";
import config from "../../config.json";
import { capitalize } from "../../functions/helpers";
import NotesResult from "./NotesResult";
import NotesForm from "../actions/NotesForm";

const Results = {
	Customers: CustomersResult,
	Orders: OrdersResult,
	Sites: SitesResult,
	Subscriptions: SubscriptionsResult,
	CustomerNotes: NotesResult,
};

const Actions = {
	CustomerNotes: NotesForm,
};

const Display = config.display;

const Headers = config.headers;

export default class ResultsList extends React.Component {
	/**
	 * Creates a Result component based on the given element for the given result.
	 *
	 * @param {Object} result  The result to display.
	 *
	 * @returns {ReactElement} The element for this result.
	 */
	getResultElement( result ) {
		let Element = Results[ this.props.resource ] || BaseResult;

		return <Element
			key={ result.id }
			attributes={ Display[ this.props.resource ] }
			result={ result }
			api={ this.props.api }
			search={ this.props.search }
			accessibleByRoles={ this.props.accessibleByRoles }/>;
	}

	/**
	 * Generates the header cells for the results.
	 *
	 * @returns {Array<ReactElement>} An array of header cells.
	 */
	generateHeaderCells() {
		return Display[ this.props.resource ].map( function ( attribute ) {
			let header = capitalize( attribute );
			if ( Headers[ this.props.resource ] && Headers[ this.props.resource ][ attribute ] ) {
				header = Headers[ this.props.resource ][ attribute ];
			}

			return <th key={ attribute }>{ header }</th>;
		}, this );
	}

	/**
	 * Gets a component to display Actions for all results.
	 *
	 * @returns {ReactElement} The actions for all results.
	 */
	getResultActions() {
		let Element = Actions[ this.props.resource ];

		if ( Element ) {
			return <Element { ...this.props } />;
		}

		return null;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Fragment>
				{ this.getResultActions() }
				<table>
					<thead>
						<tr>{ this.generateHeaderCells() }</tr>
					</thead>
					<tbody>
					{ this.props.results.map( this.getResultElement, this ) }
					</tbody>
				</table>
			</Fragment>
		)
	}
}
