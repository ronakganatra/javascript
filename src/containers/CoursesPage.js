import { connect } from "react-redux";
import { retrieveCourseEnrollments } from "../actions/courses";
import CoursesPage from "../components/CoursesPage";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => dispatch( retrieveCourseEnrollments() ),
	};
};

const CoursesEnrollmentsContainer = connect(
	mapDispatchToProps
)( CoursesPage );

export default CoursesEnrollmentsContainer;
