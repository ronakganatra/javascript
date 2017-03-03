import styled from "styled-components";
import logo from "../images/logo.svg";

export const Logo = styled.div`
    padding: 10px;
    height: ${props=>props.height};
    width: ${props=>props.width};
    background-image: url( ${logo} );
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
`;

export default Logo;
