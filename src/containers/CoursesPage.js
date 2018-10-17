import { connect } from "react-redux";
import { retrieveCoursesEnrollments } from "../actions/courses";
import CoursesPage from "../components/CoursesPage";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => dispatch( retrieveCoursesEnrollments() ),
	};
};

const CoursesEnrollmentsContainer = connect(
	mapDispatchToProps
)( CoursesPage );

export default CoursesEnrollmentsContainer;
