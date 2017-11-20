import { connect } from "react-redux";
import { retrieveCoursesEnrollments } from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];
		let courseProps = {
			id: course.id,
			progress: course.progress,
			courseId: course.courseId,
			courseName: course.course.name,
			icon: course.course.product.icon,
			buyerId: course.buyerId,
			buyerEmail: course.order.customerEmail,
			buyerName: course.buyer.userFirstName  + " " + course.buyer.userLastName,
			status: course.status,
			studentEmail: course.student.userEmail,
			studentId: course.studentId,
			studentName: course.student.userFirstName  + " " + course.student.userLastName,
		};

		return courseProps;
	} );


	return {
		coursesEnrollments,
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
