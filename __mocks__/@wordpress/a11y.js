const spokenMessages = [];

function speak( message, ariaLive ) {
	spokenMessages.push( {
		message,
		ariaLive
	} );
}

module.exports = {
	speak,
	spokenMessages
};
