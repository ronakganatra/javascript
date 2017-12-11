import React from "react";
import moment from "moment-timezone";
import Loader from "../shared/Loader";
import FinanceStatistic from "./FinanceStatistic";
import { dollarPresenter } from "../functions/presenters";
import { table } from "../functions/table";
import _merge from "lodash/merge";

export default class DailyDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			loaded: false,
			dailyStatistics: null,
			totalStatistics: null,
		};

		this.setDailyStatistic();
		this.setTotalStatistic();

		this.startDate = moment().tz( "Europe/Amsterdam" ).subtract( 5, "days" ).startOf( "month" );

		this.getStatistics();
	}

	setDailyStatistic() {
		this.dailyStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			orderCollectors: {
				orderRevenue: FinanceStatistic.getOrderRevenue,
				orderTotal:   FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
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
				orderRevenue: FinanceStatistic.getOrderRevenue,
				orderTotal:   FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
				refundRevenue: FinanceStatistic.getRefundRevenue,
				refundTotal:   FinanceStatistic.transactionsCount,
			},
		} );

	}

	getStatistics() {
		let startDate = this.startDate.toDate();

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { gt: startDate }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { gt: startDate } }, include: [ "refundLineItems", "order" ] } )
		] ).then( ( [ orders, refunds ] ) => {
			let dailyStatistics = this.dailyStatistic.collect( orders, refunds );
			let totalStatistics = this.totalStatistic.collect( orders, refunds );

			this.setState( { dailyStatistics, totalStatistics, loaded: true } );
		} );
	}

	getDailyStatistic( date ) {
		return _merge(
			{ orderRevenue: 0, orderTotal: 0, refundRevenue: 0, refundTotal: 0 },
			this.state.dailyStatistics[ date.format( "Y-M-D" ) ]
		);
	}

	getDailyRow( date ) {
		return [
			date.format( "ddd, MMM DD, YYYY" ),
			dollarPresenter( this.getDailyStatistic( date ).orderRevenue ) ,
			this.getDailyStatistic( date ).orderTotal,
			{ className: 'negative', content: dollarPresenter( this.getDailyStatistic( date ).refundRevenue ) },
			{ className: 'negative', content: this.getDailyStatistic( date ).refundTotal },
		];
	}

	getTotalRow() {
		return [
			'Total',
			dollarPresenter( this.state.totalStatistics.total.orderRevenue || 0 ),
			this.state.totalStatistics.total.orderTotal || 0,
			{ className: 'negative', content: dollarPresenter( this.state.totalStatistics.total.refundRevenue || 0 ) },
			{ className: 'negative', content: this.state.totalStatistics.total.refundTotal || 0 },
		];
	}

	render() {
		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let date  = this.startDate.clone();
		let today = moment().tz( "Europe/Amsterdam" );
		let rows  = [];

		while ( date.isBefore( today ) ) {
			rows.push( this.getDailyRow( date ) );
			date = date.add( 1, "day" );
		}
		rows.push( this.getTotalRow() );

		return table( [ "Day", "Turnover", "Transactions", "Refunded", "Refunds" ], rows, { className: "FinanceDashboard" } );
	}
}
