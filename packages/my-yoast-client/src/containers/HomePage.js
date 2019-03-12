import { connect } from "react-redux";
import HomePage from "../components/home/HomePage";

/* eslint-disable require-jsdoc */
export const mapStateToProps = () => {
	return {
		test: null,
	};
};

const HomePageContainer = connect(
	mapStateToProps,
)( HomePage );

export default HomePageContainer;