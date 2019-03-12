import styled from "styled-components";
import yoastLogo from "../icons/Yoast/Yoast_SEO_Icon_Small.svg";

const Loader = styled.div`
	display: block;
	content: "";
	width: 100px;
	height: 100px;
	background-image: url( ${ yoastLogo } );

	margin: 50px auto;
	-webkit-animation: rotate 1.5s infinite linear;
	animation: rotate 1.5s infinite linear;

	@-webkit-keyframes rotate {
		0% { -webkit-transform: perspective(500px) }
		100% { -webkit-transform: perspective(500px) rotateY(360deg) }
	}

	@keyframes rotate {
		0% {
			transform: perspective(500px) rotateX(0deg) rotateY(0deg);
			-webkit-transform: perspective(500px) rotateX(0deg) rotateY(0deg)
		} 100% {
			transform: perspective(500px) rotateX(0deg) rotateY(360deg);
			-webkit-transform: perspective(500px) rotateX(0deg) rotateY(360deg)
		}
	}
`;

export default Loader;
