import React from "react";
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
	render() {
		return (
			<nav>
				<Link to="/search">Search</Link>
			</nav>
		)
	}
}
