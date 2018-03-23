import React from "react";
import moment from "moment-timezone";
import Loader from "../shared/Loader";
import FinanceStatistic from "./FinanceStatistic";
import { currencyPresenter } from "../functions/presenters";
import { table } from "../functions/table";
import _merge from "lodash/merge";
import _times from "lodash/times";


export default class DailyDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			selectedDate: moment().tz( "Europe/Amsterdam" ),
			loaded: false,
			dailyStatistics: null,
			totalStatistics: null,
			month: moment().tz( "Europe/Amsterdam" ).format( "MMM" ),
			year: moment().tz( "Europe/Amsterdam" ).format( "YYYY" ),
		};

		this.onDateChanged = this.onDateChanged.bind( this );
		this.handleMonthChange = this.handleMonthChange.bind( this );
		this.handleYearChange = this.handleYearChange.bind( this);

		this.setDailyStatistic();
		this.setTotalStatistic();
	}

	setDailyStatistic() {
		this.dailyStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			orderCollectors: {
				revenue:      FinanceStatistic.getOrderRevenue,
				orderRevenue: FinanceStatistic.getOrderRevenue,
				orderTotal:   FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
				revenue:       FinanceStatistic.getRefundRevenue,
				refundRevenue: FinanceStatistic.getRefundRevenue,
				refundTotal:   FinanceStatistic.transactionsCount,
			},
		} );
	}

	setTotalStatistic() {
		this.totalStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.totalGroup,
			refundGroupBy: FinanceStatistic.totalGroup,
			orderCollectors: {
				revenue:      FinanceStatistic.getOrderRevenue,
				orderRevenue: FinanceStatistic.getOrderRevenue,
				orderTotal:   FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
				revenue:       FinanceStatistic.getRefundRevenue,
				refundRevenue: FinanceStatistic.getRefundRevenue,
				refundTotal:   FinanceStatistic.transactionsCount,
			},
		} );

	}

	getStatistics() {
		let startDate = this.state.selectedDate.clone().startOf( "month" ).toDate();
		let endDate = this.state.selectedDate.clone().endOf( "month" ).toDate();

		this.setState( { loaded: false } );

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { between: [ startDate, endDate ] }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { between: [ startDate, endDate ] } }, include: [ "refundLineItems", "order" ] } ),
		] ).then( ( [ orders, refunds ] ) => {
			let dailyStatistics = this.dailyStatistic.collect( orders, refunds );
			let totalStatistics = this.totalStatistic.collect( orders, refunds );

			this.setState( { dailyStatistics, totalStatistics, loaded: true } );
		} );
	}

	getDailyStatistic( date ) {
		return _merge(
			{ orderRevenue: 0, orderTotal: 0, refundRevenue: 0, refundTotal: 0, revenue: 0 },
			this.state.dailyStatistics[ date.format( "Y-M-D" ) ]
		);
	}

	getTotalStatistic() {
		return _merge(
			{ orderRevenue: 0, orderTotal: 0, refundRevenue: 0, refundTotal: 0, revenue: 0 },
			this.state.totalStatistics.total
		);
	}

	getDailyRow( date ) {
		let dailyStatistic = this.getDailyStatistic( date );

		return [
			date.format( "ddd, MMM DD, YYYY" ),
			currencyPresenter( "USD", dailyStatistic.orderRevenue ) ,
			dailyStatistic.orderTotal,
			{ className: "negative", content: currencyPresenter( "USD", dailyStatistic.refundRevenue ) },
			{ className: "negative", content: dailyStatistic.refundTotal },
			currencyPresenter( "USD", dailyStatistic.revenue ),
		];
	}

	getTotalRow() {
		let totalStatistic = this.getTotalStatistic();

		return [
			"Total",
			currencyPresenter( "USD", totalStatistic.orderRevenue ),
			totalStatistic.orderTotal || 0,
			{ className: "negative", content: currencyPresenter( "USD", totalStatistic.refundRevenue ) },
			{ className: "negative", content: totalStatistic.refundTotal || 0 },
			currencyPresenter( "USD", totalStatistic.revenue || 0 ),
		];
	}

	handleMonthChange( e ){
		this.setState( { month: e.target.value } );
	}

	handleYearChange( e ){
		this.setState( { year: e.target.value } );
	}

	generateMonthOptions(){
		let m = moment.monthsShort();

		return m.map( ( month ) => {
			return <option key={ month } value={ month }>{ month }</option>;
		} );
	}

	generateYearOptions( year ){
		return _times( 5, ( n ) => {
			let y = year - n;
			return <option key={ n } value={ y }>{ y }</option>;
		} );
	}

	generateRows(){
		let today = moment().tz( "Europe/Amsterdam" );
		let date = this.state.selectedDate.clone().startOf( "month" );
		let endDate = this.state.selectedDate.clone().endOf( "month" );
		let rows  = [];

		if ( endDate > today ) {
			endDate = today;
		}

		while ( date.isBefore( endDate ) ) {
			rows.push( this.getDailyRow( date ) );
			date = date.add( 1, "day" );
		}
		rows.push( this.getTotalRow() );
		return rows;
	}

	onDateChanged( e ) {
		if ( this.state.month !== this.state.selectedDate.format( "MMM" ) || this.state.year !== this.state.selectedDate.format( "YYYY" ) ) {
			this.setState( {
				selectedDate: moment().tz( "Europe/Amsterdam" ).set( {
					"year": this.state.year,
					"month": this.state.month,
				} ),
			}, this.getStatistics );
		}
		e.preventDefault();
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
						<select onChange={ this.handleMonthChange } value={ this.state.month }>
							{ this.generateMonthOptions() }
						</select>
						<select onChange={ this.handleYearChange }  value={ this.state.year }>
							{ this.generateYearOptions( moment().tz( "Europe/Amsterdam" ).format( "YYYY" ) ) }
						</select>
						<button onClick={ this.onDateChanged } >Search</button>
					</fieldset>
				</form>
				{ table( [ "Day", "Turnover", "Transactions", "Refunded", "Refunds", "Revenue" ], rows, { className: "FinanceDashboard" } ) }
			</div>
		);
	}
}
