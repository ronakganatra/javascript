import React from "react";
import moment from "moment-timezone";
import Loader from "../shared/Loader";
import FinanceStatistic from "./FinanceStatistic";
import { table } from "../functions/table";
import _times from "lodash/times";
import _flow from "lodash/fp/flow";
import _sortBy from "lodash/fp/sortBy";
import _map from "lodash/fp/map";
import _join from "lodash/fp/join";
import _each from "lodash/fp/each";
import _filter from "lodash/fp/filter";

export default class CartCompositionDashboard extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			selectedDate: moment().tz( "Europe/Amsterdam" ),
			loaded: false,
			statistics: null,
			month: moment().tz( "Europe/Amsterdam" ).format( "MMM" ),
			year: moment().tz( "Europe/Amsterdam" ).format( "YYYY" ),
		};

		this.onDateChanged = this.onDateChanged.bind( this );
		this.handleMonthChange = this.handleMonthChange.bind( this );
		this.handleYearChange = this.handleYearChange.bind( this);

		this.setStatistic();
	}

	setStatistic() {
		this.statistic = new FinanceStatistic( {
			orderGroupBy: order => {
				return _flow(
					_filter( item => ! item.parentId ),
					_sortBy( "productName" ),
					_map( "productName" ),
					_join( "\n" )
				)( order.items ) || "Unknown"
			},
			refundGroupBy: FinanceStatistic.groupByDate( "Y-M-D" ),
			orderCollectors: {
				transactionCount: FinanceStatistic.transactionsCount,
				personCount: order => order.customerCompany ? 0 : 1,
				companyCount: order => order.customerCompany ? 1 : 0,
			},
			refundCollectors: {},
		} );
	}

	getStatistics() {
		let startDate = this.state.selectedDate.clone().startOf( "month" ).toDate();
		let endDate = this.state.selectedDate.clone().endOf( "month" ).toDate();

		this.setState( { loaded: false } );

		this.props.api.search(
			"Orders",
			{
				where: { date: { between: [ startDate, endDate ] }, status: { inq: [ "completed", "processing", "refunded" ] } },
				include: "items",
			}
		).then( orders => {
			let statistics = this.statistic.collect( orders, [] );

			this.setState( { statistics, loaded: true } );
		} );
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

	generateRows(){
		if ( ! this.state.statistics ) {
			return [];
		}
		let total = 0;

		return _flow(
			_each( row => total += row.transactionCount ),
			_sortBy( row => row.transactionCount * -1 ),
			_map( row => {
				return [
					row.group,
					row.transactionCount,
					( row.transactionCount / total * 100 ).toFixed( 2 ) + "%",
					row.personCount + " ( " + ( row.transactionCount ? ( row.personCount / row.transactionCount * 100 ).toFixed( 2 ) : "0.00" ) + "% )",
					row.companyCount + " ( " + ( row.transactionCount ? ( row.companyCount / row.transactionCount * 100 ).toFixed( 2 ) : "0.00" ) + "% )",
				]
			} )
		)( this.state.statistics );
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
				{ table( [ "Cart Composition", "Total", "Percentage", "Of which Persons", "Of which Companies" ], rows, { className: "FinanceDashboard" } ) }
			</div>
		);
	}
}
