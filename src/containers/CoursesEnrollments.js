import { connect } from "react-redux";
import { retrieveCoursesEnrollments } from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	console.log( "State in de container", state );
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];

		let courseProps = {
			id: course.id,
			status: course.status,
			progress: course.progress,
			courseId: course.courseId,
			buyerId: course.buyerId,
			studentId: course.studentId,
			orderId: course.orderId,
		};

		return courseProps;
	} );

	let finishedCourses = coursesEnrollments.filter( ( course ) => {
		return course.status === "completed";
	} );

	return {
		finishedCourses,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadData: () => dispatch( retrieveCoursesEnrollments() ),
	};
};

const CoursesEnrollmentsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesEnrollments );

export default CoursesEnrollmentsContainer;
