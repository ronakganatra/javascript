import React, { Component } from "react";
import "./App.css";
import "normalize.css/normalize.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Content } from "./components/Layout";
import { Provider } from "react-redux";

class App extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<Layout>
					<Sidebar>
						<UserStatus />
					</Sidebar>
					<Content>
<p className="uppercase light">Open Sans 300:</p>
<p className="light">
The quick, <strong>brown fox</strong> jumps over a <em>lazy dog</em>. DJs flock by when MTV ax quiz prog.
Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz,
bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz
whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting
zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew
my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax
my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my
brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job,
kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad
quack might jinx zippy fowls. Few quips galvanized the mock jury box.
</p>
<p className="uppercase">Open Sans regular:</p>
<p>
The quick, <strong>brown fox</strong> jumps over a <em>lazy dog</em>. DJs flock by when MTV ax quiz prog.
Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz,
bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz
whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting
zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew
my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax
my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my
brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job,
kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad
quack might jinx zippy fowls. Few quips galvanized the mock jury box.
</p>
					</Content>
				</Layout>
			</Provider>
		);
	}
}

App.propTypes = {
	store: React.PropTypes.object,
};

export default App;
