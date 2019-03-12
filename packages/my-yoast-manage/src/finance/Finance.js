import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { path } from "../functions/helpers";
import HourlyDashboard from "./HourlyDashboard";
import DailyDashboard from "./DailyDashboard";
import CartCompositionDashboard from "./CartCompositionDashboard";
import PersonCompanyDashboard from "./PersonCompanyDashboard";

export default class Finance extends React.Component {
	render() {
		return (
			<div>
				<div className="FinanceLinks">
					<Link to={ { pathname: path( "/finance/hourly" ), state: {} } }>Hourly</Link>
					<Link to={ { pathname: path( "/finance/daily" ), state: {} } }>Daily</Link>
					<Link to={ { pathname: path( "/finance/composition" ), state: {} } }>Cart Composition</Link>
					<Link to={ { pathname: path( "/finance/persons-companies" ), state: {} } }>Persons and Companies</Link>
				</div>
				<div>
					<Route exact path={ path( "/finance" ) } render={ () => <Redirect to={ path( "/finance/hourly" ) } /> } />
					<Route path={ path( "/finance/hourly" ) } render={ () => <HourlyDashboard api={ this.props.api } /> } />
					<Route path={ path( "/finance/daily" ) } render={ () => <DailyDashboard api={ this.props.api } /> } />
					<Route path={ path( "/finance/composition" ) } render={ () => <CartCompositionDashboard api={ this.props.api } /> } />
					<Route path={ path( "/finance/persons-companies" ) } render={ () => <PersonCompanyDashboard api={ this.props.api } /> } />
				</div>
			</div>
		);

	}
}
