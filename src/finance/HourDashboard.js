import React from "react";
import Loader from "../shared/Loader";
import moment from "moment-timezone";
import _sumBy from "lodash/sumBy";
import _times from "lodash/times";
import crypto from "crypto";
import {dollarPresenter, euroPresenter} from "../functions/presenters";

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

		this.props.api.search( "Orders", { where: { date: { gt: twoWeeksAgo }, status: { inq: [ "completed", "processing", "refunded" ] } }, include: [ "refunds" ] } )
			.then( orders => {
				let hourlyStatistics = {};
				let dailyStatistics = {};
				let untilNowStatistics = {};

				for ( let i = 0; i < orders.length; i++ ) {
					let order = orders[ i ];
					let date = moment( order.date ).tz( "Europe/Amsterdam" );
					let hour = date.format( "Y-M-D H:00" );
					let day = date.format( "Y-M-D" );
					let revenue = order.totalAmount - _sumBy( order.refunds, "amount" );

					hourlyStatistics = HourDashboard.collectStatistics( hourlyStatistics, hour, order.currency, revenue );
					dailyStatistics = HourDashboard.collectStatistics( dailyStatistics, day, order.currency, revenue );

					if ( date.hour() <= currentHour ) {
						untilNowStatistics = HourDashboard.collectStatistics( untilNowStatistics, day, order.currency, revenue );
					}
				}

				this.setState( { hourlyStatistics, dailyStatistics, untilNowStatistics, loaded: true } );
			} );
	}

	static collectStatistics( statistics, key, currency, revenue ) {
		statistics[ key ] = statistics[ key ] || { euroRevenue: 0, dollarRevenue: 0, orderTotal: 0 };
		statistics[ key ].orderTotal += 1;
		if ( currency === "EUR" ) {
			statistics[ key ].euroRevenue += revenue;
		} else {
			statistics[ key ].dollarRevenue += revenue;
		}

		return statistics;
	}

	getHourlyStatistic( date, hour ) {
		return (
			this.state.hourlyStatistics[ date.clone().hour( hour ).format( "Y-M-D H:00" ) ] ||
			{ euroRevenue: 0, dollarRevenue: 0, orderTotal: 0 }
		);
	}

	getDailyStatistic( date ) {
		return (
			this.state.dailyStatistics[ date.format( "Y-M-D" ) ] ||
			{ euroRevenue: 0, dollarRevenue: 0, orderTotal: 0 }
		);
	}

	getUntilNowStatistic( date ) {
		return (
			this.state.untilNowStatistics[ date.format( "Y-M-D" ) ] ||
			{ euroRevenue: 0, dollarRevenue: 0, orderTotal: 0 }
		);
	}

	handlePasswordChange( event ) {
		let password = event.target.value;

		window.localStorage.setItem( "yoast-finance-password", password );
		this.setState( { password } );
	}

	render() {
		if ( crypto.createHash( "sha256" ).update( this.state.password ).digest().toString( "hex" ) !== "4fda9df9de63c96b3973f20e6446f4e4327cdbf0ace08fe51db483abbd20bfc6" ) {
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
						<th colSpan="3">Today</th>
						<th colSpan="3">Yesterday</th>
						<th colSpan="3">Last week</th>
						<th colSpan="3">Two weeks ago</th>
					</tr>
				</thead>
				<tbody>
					{ _times( 24, i => {
						return (
							<tr key={ i } className={ i === currenHour ? "now" : "" }>
								<td>{ i }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( today, i ).dollarRevenue ) }</td>
								<td>{ euroPresenter( this.getHourlyStatistic( today, i ).euroRevenue ) }</td>
								<td>{ this.getHourlyStatistic( today, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( yesterday, i ).dollarRevenue ) }</td>
								<td>{ euroPresenter( this.getHourlyStatistic( yesterday, i ).euroRevenue ) }</td>
								<td>{ this.getHourlyStatistic( yesterday, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( lastWeek, i ).dollarRevenue ) }</td>
								<td>{ euroPresenter( this.getHourlyStatistic( lastWeek, i ).euroRevenue ) }</td>
								<td>{ this.getHourlyStatistic( lastWeek, i ).orderTotal }</td>
								<td>{ dollarPresenter( this.getHourlyStatistic( twoWeeksAgo, i ).dollarRevenue ) }</td>
								<td>{ euroPresenter(this.getHourlyStatistic( twoWeeksAgo, i ).euroRevenue ) }</td>
								<td>{ this.getHourlyStatistic( twoWeeksAgo, i ).orderTotal }</td>
							</tr>
						);
					} ) }
					<tr key="untilNow" className="now">
						<td>Total</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( today ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getUntilNowStatistic( today ).euroRevenue ) }</td>
						<td>{ this.getUntilNowStatistic( today ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( yesterday ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getUntilNowStatistic( yesterday ).euroRevenue ) }</td>
						<td>{ this.getUntilNowStatistic( yesterday ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( lastWeek ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getUntilNowStatistic( lastWeek ).euroRevenue ) }</td>
						<td>{ this.getUntilNowStatistic( lastWeek ).orderTotal }</td>
						<td>{ dollarPresenter( this.getUntilNowStatistic( twoWeeksAgo ).dollarRevenue ) }</td>
						<td>{ euroPresenter(this.getUntilNowStatistic( twoWeeksAgo ).euroRevenue ) }</td>
						<td>{ this.getUntilNowStatistic( twoWeeksAgo ).orderTotal }</td>
					</tr>
					<tr key="day">
						<td>Total</td>
						<td>{ dollarPresenter( this.getDailyStatistic( today ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getDailyStatistic( today ).euroRevenue ) }</td>
						<td>{ this.getDailyStatistic( today ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( yesterday ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getDailyStatistic( yesterday ).euroRevenue ) }</td>
						<td>{ this.getDailyStatistic( yesterday ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( lastWeek ).dollarRevenue ) }</td>
						<td>{ euroPresenter( this.getDailyStatistic( lastWeek ).euroRevenue ) }</td>
						<td>{ this.getDailyStatistic( lastWeek ).orderTotal }</td>
						<td>{ dollarPresenter( this.getDailyStatistic( twoWeeksAgo ).dollarRevenue ) }</td>
						<td>{ euroPresenter(this.getDailyStatistic( twoWeeksAgo ).euroRevenue ) }</td>
						<td>{ this.getDailyStatistic( twoWeeksAgo ).orderTotal }</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
