import { SVGIcon } from "../components/SVGIcon";
import React from "react";

export const upArrow = <SVGIcon><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></SVGIcon>;
export const downArrow = <SVGIcon><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" /></SVGIcon>;

/**
 * Returns an upward pointing chevron, or a downward pointing one. Depending on whether isOpen is true or false, respectively.
 *
 * @param   {boolean}      isOpen The props for the upDownArrow.
 * @returns {ReactElement}        An up or down arrow.
 */
export default function UpDownArrow( isOpen )  {
	return isOpen ? upArrow : downArrow;
}
