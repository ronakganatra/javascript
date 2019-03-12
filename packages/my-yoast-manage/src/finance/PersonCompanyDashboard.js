import React from "react";
import moment from "moment-timezone";
import Loader from "../shared/Loader";
import FinanceStatistic from "./FinanceStatistic";
import { table } from "../functions/table";
import _times from "lodash/times";
import _merge from "lodash/merge";

export default class PersonCompanyDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			selectedDate: moment().tz( "Europe/Amsterdam" ),
			loaded: false,
			monthlyStatistics: null,
			year: moment().tz( "Europe/Amsterdam" ).format( "YYYY" ),
		};

		this.handleYearChange = this.handleYearChange.bind( this);

		this.setMonthlyStatistic();
		this.setTotalStatistic();
	}

	setMonthlyStatistic() {
		this.monthlyStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M" ),
			orderCollectors: {
				personCount: order => order.customerCompany ? 0 : 1,
				companyCount: order => order.customerCompany ? 1 : 0,
			},
		} );
	}

	setTotalStatistic() {
		this.totalStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.totalGroup,
			orderCollectors: {
				personCount: order => order.customerCompany ? 0 : 1,
				companyCount: order => order.customerCompany ? 1 : 0,
			},
		} );
	}

	getStatistics() {
		let startDate = this.state.selectedDate.clone().startOf( "year" ).toDate();
		let endDate = this.state.selectedDate.clone().endOf( "year" ).toDate();

		this.setState( { loaded: false } );

		this.props.api.search(
			"Orders",
			{ where: { date: { between: [ startDate, endDate ] }, status: { inq: [ "completed", "processing", "refunded" ] } } }
		).then( orders => {
			let monthlyStatistics = this.monthlyStatistic.collect( orders );
			let totalStatistics   = this.totalStatistic.collect( orders );

			this.setState( { monthlyStatistics, totalStatistics, loaded: true } );
		} );
	}

	handleYearChange( e ){
		this.setState( {
			year: e.target.value,
			selectedDate: moment().tz( "Europe/Amsterdam" ).set( { year: e.target.value } ),
		}, this.getStatistics );
	}

	generateYearOptions( year ){
		return _times( 5, ( n ) => {
			let y = year - n;
			return <option key={ n } value={ y }>{ y }</option>;
		} );
	}

	getMonthlyStatistic( date ) {
		return _merge(
			{ personCount: 0, companyCount: 0 },
			this.state.monthlyStatistics[ date.format( "Y-M" ) ]
		);
	}

	getTotalStatistic() {
		return _merge(
			{ personCount: 0, companyCount: 0 },
			this.state.totalStatistics.total
		);
	}

	getRow( label, statistic ) {
		let total = statistic.personCount + statistic.companyCount;

		return [
			label,
			statistic.personCount,
			( total ? ( statistic.personCount / total * 100 ).toFixed( 2 ) : "0.00" ) + "%",
			statistic.companyCount,
			( total ? ( statistic.companyCount / total * 100 ).toFixed( 2 ) : "0.00" ) + "%",
		];
	}

	generateRows(){
		let today = moment().tz( "Europe/Amsterdam" );
		let date = this.state.selectedDate.clone().startOf( "year" );
		let endDate = this.state.selectedDate.clone().endOf( "year" );
		let rows  = [];

		if ( endDate > today ) {
			endDate = today;
		}

		while ( date.isBefore( endDate ) ) {
			rows.push( this.getRow( date.format( "MMM YYYY" ), this.getMonthlyStatistic( date ) ) );
			date = date.add( 1, "month" );
		}
		rows.push( this.getRow( "Total", this.getTotalStatistic() ) );
		return rows;
	}

	componentDidMount(){
		this.getStatistics()
	}

	render() {
		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let rows = this.generateRows();

		return (
			<div>
				<form onSubmit={ this.onDateChanged }>
					<fieldset>
						<select onChange={ this.handleYearChange }  value={ this.state.year } className="widest">
							{ this.generateYearOptions( moment().tz( "Europe/Amsterdam" ).format( "YYYY" ) ) }
						</select>
					</fieldset>
				</form>
				{ table(
					[ "Month", "Amount of Persons", "Percentage of Persons", "Amount of Companies", "Percentage of Companies" ],
					rows,
					{ className: "FinanceDashboard" }
				) }
			</div>
		);
	}
}
