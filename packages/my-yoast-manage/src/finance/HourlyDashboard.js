import React from "react";
import Loader from "../shared/Loader";
import moment from "moment-timezone";
import { table } from "../functions/table";
import { currencyPresenter } from "../functions/presenters";
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

		this.setHourlyStatistic();
		this.setUntilNowStatistic();
		this.setDailyStatistic();

		this.currentHour = moment().tz( "Europe/Amsterdam" ).hour();

		this.getStatistics();
	}

	setHourlyStatistic() {
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
	}

	setDailyStatistic() {
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
	}

	setUntilNowStatistic() {
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
	}

	getStatistics() {
		let twoWeeksAgo = moment().startOf( "day" ).subtract( 2, "weeks" ).toDate();

		Promise.all( [
			this.props.api.search( "Orders", { where: { date: { gt: twoWeeksAgo }, status: { inq: [ "completed", "processing", "refunded" ] } } } ),
			this.props.api.search( "Refunds", { where: { date: { gt: twoWeeksAgo } }, include: [ "refundLineItems", "order" ] } )
		] ).then( ( [ orders, refunds ] ) => {
				let hourlyStatistics = this.hourlyStatistic.collect( orders, refunds );
				let dailyStatistics = this.dailyStatistic.collect( orders, refunds );
				let untilNowStatistics = this.untilNowStatistic.collect( orders, refunds );

				this.setState( { hourlyStatistics, dailyStatistics, untilNowStatistics, loaded: true } );
			} );
	}

	getHourlyStatistic( date, hour ) {
		return (
			this.state.hourlyStatistics[ date.clone().hour( hour ).format( "Y-M-D-H" ) ] ||
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

	getHourlyRow( dates, hour ) {
		let row = [ hour ];

		for ( let i = 0; i < dates.length; i ++ ) {
			let date = dates[ i ];
			row.push( currencyPresenter( "USD", this.getHourlyStatistic( date, hour ).revenue ) );
			row.push( this.getHourlyStatistic( date, hour ).orderTotal );
		}

		if ( hour === this.currentHour ) {
			return { className: "now", content: row };
		}

		return row;
	}

	getUntilNowRow( dates ) {
		let row = [ "Total" ];

		for ( let i = 0; i < dates.length; i ++ ) {
			let date = dates[ i ];
			row.push( currencyPresenter( "USD", this.getUntilNowStatistic( date ).revenue ) );
			row.push( this.getUntilNowStatistic( date ).orderTotal );
		}

		return { className: "now", content: row };
	}

	getTotalRow( dates ) {
		let row = [ "Total" ];

		for ( let i = 0; i < dates.length; i ++ ) {
			let date = dates[ i ];
			row.push( currencyPresenter( "USD", this.getDailyStatistic( date ).revenue ) );
			row.push( this.getDailyStatistic( date ).orderTotal );
		}

		return row;
	}

	render() {
		if ( ! this.state.loaded ) {
			return <Loader />;
		}

		let today = moment().startOf( "day" );
		let dates = [
			today,
			today.clone().subtract( 1 , "day" ),
			today.clone().subtract( 1, "week" ),
			today.clone().subtract( 2, "weeks" )
		];
		let rows = [];

		for( let i = 0; i < 24; i++ ) {
			rows.push( this.getHourlyRow( dates, i ) );
		}
		rows.push( this.getUntilNowRow( dates ) );
		rows.push( this.getTotalRow( dates ) );

		return table(
			[ "Hour", { colSpan: 2, content: "Today" }, { colSpan: 2, content: "Yesterday" }, { colSpan: 2, content: "Last week" }, { colSpan: 2, content: "Two weeks ago" } ],
			rows,
			{ className: "FinanceDashboard" }
		);
	}
}
