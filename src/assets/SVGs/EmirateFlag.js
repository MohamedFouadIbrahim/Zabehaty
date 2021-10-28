import React from "react"
import Svg, { Path } from "react-native-svg"

const EmirateFlag = (props) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={263}
			height={150}
			viewBox="0 0 263 150"
			{...props}
		>
			<Path fill="#009e49" d="M0 0h263v50H0z" />
			<Path fill="#fff" d="M0 50h263v50H0z" />
			<Path fill="#000" d="M0 100h263v50H0z" />
			<Path fill="#ce1126" d="M0 0h75v150H0z" />
		</Svg>
	)
}

export default EmirateFlag
