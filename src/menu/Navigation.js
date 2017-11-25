import React from "react";
import { Link } from 'react-router-dom'
import { InitialState as TransferState } from "../transfer/Transfer"
import { InitialState as SearchState } from "../search/Search"
import { path } from "../functions/helpers";

export default class Navigation extends React.Component {
	render() {
		return (
			<nav>
				<Link to={ { pathname: path( "/search" ), state: TransferState } }>Search</Link>
				<Link to={ { pathname: path( "/transfer" ), state: SearchState } }>Transfer</Link>
				<Link to={ { pathname: path( "/refund" ), state: {} } }>Refund</Link>
				<Link to={ { pathname: path( "/finance" ), state: {} } }>Finance</Link>
			</nav>
		)
	}
}
