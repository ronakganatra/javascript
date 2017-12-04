import React from "react";
import moment from "moment-timezone";
import Loader from "../shared/Loader";
import FinanceStatistic from "./FinanceStatistic";
import { dollarPresenter } from "../functions/presenters";

export default class DailyDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			loaded: false,
			dailyStatistics: null,
			totalStatistics: null,
		};

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

		this.startDate = moment().tz( "Europe/Amsterdam" ).subtract( 5, "days" ).startOf( "month" );

		this.getStatistics();
	}

	getStatistics() {
		let startDate = this.startDate.toDate();

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { gt: startDate }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { gt: startDate } }, include: [ "refundLineItems" ] } )
		] ).then( ( [ orders, refunds ] ) => {
			let dailyStatistics = this.dailyStatistic.collect( orders, refunds );
			let totalStatistics = this.totalStatistic.collect( orders, refunds );

			this.setState( { dailyStatistics, totalStatistics, loaded: true } );
		} );
	}

	getDailyStatistic( date ) {
		return (
			this.state.dailyStatistics[ date.format( "Y-M-D" ) ] ||
			{ orderRevenue: 0, orderTotal: 0, refundRevenue: 0, refundTotal: 0 }
		);
	}

	render() {
		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let date  = this.startDate.clone();
		let today = moment().tz( "Europe/Amsterdam" );
		let rows  = [];

		while ( date.isBefore( today ) ) {
			rows.push(
				<tr key={ date.format("Y-M-D") }>
					<td>{ date.format( "ddd, MMM DD, YYYY" ) }</td>
					<td>{ dollarPresenter( this.getDailyStatistic( date ).orderRevenue ) }</td>
					<td>{ this.getDailyStatistic( date ).orderTotal }</td>
					<td className="negative">{ dollarPresenter( this.getDailyStatistic( date ).refundRevenue ) }</td>
					<td className="negative">{ this.getDailyStatistic( date ).refundTotal }</td>
				</tr>
			);

			date = date.add( 1, "day" );
		}

		return (
			<table className="FinanceDashboard">
				<thead>
				<tr>
					<th>Day</th>
					<th>Turnover</th>
					<th>Transactions</th>
					<th>Refunded</th>
					<th>Refunds</th>
				</tr>
				</thead>
				<tbody>
					{ rows }
					<tr key="total">
						<td>{ dollarPresenter( -1 ) }</td>
						<td>{ dollarPresenter( this.state.totalStatistics.total.orderRevenue ) }</td>
						<td>{ this.state.totalStatistics.total.orderTotal }</td>
						<td className="negative">{ dollarPresenter( this.state.totalStatistics.total.refundRevenue ) }</td>
						<td className="negative">{ this.state.totalStatistics.total.refundTotal }</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
