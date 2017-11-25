import React from "react";
import Loader from "../shared/Loader";
import moment from "moment-timezone";
import _sumBy from "lodash/sumBy";
import _times from "lodash/times";
import crypto from "crypto";
import {dollarPresenter} from "../functions/presenters";

export default class HourDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			password: window.localStorage.getItem( "yoast-finance-password" ),
			hourlyStatistics: {},
			loaded: false
		};

		this.handlePasswordChange = this.handlePasswordChange.bind( this );

		this.getOrders();
	}

	getOrders() {
		let twoWeeksAgo = moment().startOf( "day" ).subtract( 2, "weeks" ).toDate();
		let currentHour = moment().hour();

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { gt: twoWeeksAgo }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { gt: twoWeeksAgo }, include: [ "refundLineItems" ] } } )
		] ).then( ( [ orders, refunds ] ) => {
				let hourlyStatistics = {};
				let dailyStatistics = {};
				let untilNowStatistics = {};

				for ( let i = 0; i < orders.length; i++ ) {
					let order = orders[ i ];
					let date = moment( order.date ).tz( "Europe/Amsterdam" );
					let hour = date.format( "Y-M-D H:00" );
					let day = date.format( "Y-M-D" );

					hourlyStatistics = HourDashboard.collectStatistics( hourlyStatistics, hour, order.subtotalAmount );
					dailyStatistics = HourDashboard.collectStatistics( dailyStatistics, day, order.subtotalAmount );

					if ( date.hour() <= currentHour ) {
						untilNowStatistics = HourDashboard.collectStatistics( untilNowStatistics, day, order.subtotalAmount );
					}
				}

				for ( let i = 0; i < refunds.length; i++ ) {
					let refund = refunds[ i ];
					let date = moment( refund.date ).tz( "Europe/Amsterdam" );
					let hour = date.format( "Y-M-D H:00" );
					let day = date.format( "Y-M-D" );
					let revenue = _sumBy( refund.refundLineItems, "subtotalAmount" ) * -1;

					hourlyStatistics = HourDashboard.collectStatistics( hourlyStatistics, hour, revenue );
					dailyStatistics = HourDashboard.collectStatistics( dailyStatistics, day, revenue );

					if ( date.hour() <= currentHour ) {
						untilNowStatistics = HourDashboard.collectStatistics( untilNowStatistics, day, revenue );
					}
				}

				this.setState( { hourlyStatistics, dailyStatistics, untilNowStatistics, loaded: true } );
			} );
	}

	static collectStatistics( statistics, key, revenue ) {
		statistics[ key ] = statistics[ key ] || { revenue: 0, orderTotal: 0 };
		statistics[ key ].orderTotal += 1;
		statistics[ key ].revenue += revenue;

		return statistics;
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

	handlePasswordChange( event ) {
		let password = event.target.value;

		window.localStorage.setItem( "yoast-finance-password", password );
		this.setState( { password } );
	}

	render() {
		if ( this.state.password === null || crypto.createHash( "sha256" ).update( this.state.password ).digest().toString( "hex" ) !== "4fda9df9de63c96b3973f20e6446f4e4327cdbf0ace08fe51db483abbd20bfc6" ) {
			return <form><input className="widest" onChange={ this.handlePasswordChange } /></form>;
		}

		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let today = moment().startOf( "day" );
		let yesterday = today.clone().subtract( 1 , "day" );
		let lastWeek = today.clone().subtract( 1, "week" );
		let twoWeeksAgo = today.clone().subtract( 2, "weeks" );
		let currenHour = moment().hour();

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
							<tr key={ i } className={ i === currenHour ? "now" : "" }>
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
