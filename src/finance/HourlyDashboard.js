import React from "react";
import Loader from "../shared/Loader";
import moment from "moment-timezone";
import _times from "lodash/times";
import { dollarPresenter } from "../functions/presenters";
import FinanceStatistic from "./FinanceStatistic";

export default class HourlyDashboard extends React.Component {
	untilNowCondition( item ) {
		return moment( item.date ).tz( "Europe/Amsterdam" ).hour() <= this.currentHour;
	}

	constructor( props ) {
		super( props );

		this.state = {
			hourlyStatistics: {},
			loaded: false
		};

		this.untilNowCondition = this.untilNowCondition.bind( this );

		this.hourlyStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M-D-H" ),
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D-H" ),
			orderCollectors: {
				revenue:    FinanceStatistic.getOrderRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
				revenue:    FinanceStatistic.getRefundRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
		} );
		this.dailyStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			orderCollectors: {
				revenue:    FinanceStatistic.getOrderRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
			refundCollectors: {
				revenue:    FinanceStatistic.getRefundRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
		} );
		this.untilNowStatistic = new FinanceStatistic( {
			orderGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			orderCollectors: {
				revenue:    FinanceStatistic.getOrderRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
			orderCondition: this.untilNowCondition,
			refundCollectors: {
				revenue:    FinanceStatistic.getRefundRevenue,
				orderTotal: FinanceStatistic.transactionsCount,
			},
			refundCondition: this.untilNowCondition,
		} );
		this.currentHour = moment().tz( "Europe/Amsterdam" ).hour();

		this.getStatistics();
	}

	getStatistics() {
		let twoWeeksAgo = moment().startOf( "day" ).subtract( 2, "weeks" ).toDate();

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { gt: twoWeeksAgo }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { gt: twoWeeksAgo } }, include: [ "refundLineItems" ] } )
		] ).then( ( [ orders, refunds ] ) => {
				let hourlyStatistics = this.hourlyStatistic.collect( orders, refunds );
				let dailyStatistics = this.dailyStatistic.collect( orders, refunds );
				let untilNowStatistics = this.untilNowStatistic.collect( orders, refunds );

				this.setState( { hourlyStatistics, dailyStatistics, untilNowStatistics, loaded: true } );
			} );
	}

	getHourlyStatistic( date, hour ) {
		return (
			this.state.hourlyStatistics[ date.clone().hour( hour ).format( "Y-M-D H:00" ) ] ||
			{ revenue: 0, orderTotal: 0 }
		);
	}

	getDailyStatistic( date ) {
		return (
			this.state.dailyStatistics[ date.format( "Y-M-D" ) ] ||
			{ revenue: 0, orderTotal: 0 }
		);
	}

	getUntilNowStatistic( date ) {
		return (
			this.state.untilNowStatistics[ date.format( "Y-M-D" ) ] ||
			{ revenue: 0, orderTotal: 0 }
		);
	}

	render() {
		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let today = moment().startOf( "day" );
		let yesterday = today.clone().subtract( 1 , "day" );
		let lastWeek = today.clone().subtract( 1, "week" );
		let twoWeeksAgo = today.clone().subtract( 2, "weeks" );

		return (
			<table className="FinanceDashboard">
				<thead>
					<tr>
						<th>Hour</th>
						<th colSpan="2">Today</th>
						<th colSpan="2">Yesterday</th>
						<th colSpan="2">Last week</th>
						<th colSpan="2">Two weeks ago</th>
					</tr>
				</thead>
				<tbody>
					{ _times( 24, i => {
						return (
							<tr key={ i } className={ i === this.currentHour ? "now" : "" }>
								<td>{ i }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( today, i ).revenue ) }</td>
								<td>{ this.getHourlyStatistic( today, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( yesterday, i ).revenue ) }</td>
								<td>{ this.getHourlyStatistic( yesterday, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( lastWeek, i ).revenue ) }</td>
								<td>{ this.getHourlyStatistic( lastWeek, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( twoWeeksAgo, i ).revenue ) }</td>
								<td>{ this.getHourlyStatistic( twoWeeksAgo, i ).orderTotal }</td>
							</tr>
						);
					} ) }
					<tr key="untilNow" className="now">
						<td>Total</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( today ).revenue ) }</td>
						<td>{ this.getUntilNowStatistic( today ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( yesterday ).revenue ) }</td>
						<td>{ this.getUntilNowStatistic( yesterday ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( lastWeek ).revenue ) }</td>
						<td>{ this.getUntilNowStatistic( lastWeek ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( twoWeeksAgo ).revenue ) }</td>
						<td>{ this.getUntilNowStatistic( twoWeeksAgo ).orderTotal }</td>
					</tr>
					<tr key="day">
						<td>Total</td>
						<td>{ dollarPresenter( this.getDailyStatistic( today ).revenue ) }</td>
						<td>{ this.getDailyStatistic( today ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( yesterday ).revenue ) }</td>
						<td>{ this.getDailyStatistic( yesterday ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( lastWeek ).revenue ) }</td>
						<td>{ this.getDailyStatistic( lastWeek ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( twoWeeksAgo ).revenue ) }</td>
						<td>{ this.getDailyStatistic( twoWeeksAgo ).orderTotal }</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
