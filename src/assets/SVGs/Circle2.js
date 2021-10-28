import React from "react";
import Svg, { Circle, Text, TSpan } from "react-native-svg"
import { h, w } from '../../mutils';

const SVGIcon = props => (
    <Svg
        width={props.params.width ? w(props.params.width) : w(16)}
        height={props.params.height ? h(props.params.height) : h(16)}
        style={[{ transform: [{ rotate: (props.params.rotateDegree ? props.params.rotateDegree : 0) + 'deg' }] }, props.params.style]}
        viewBox="0 0 52 52"
        {...props}
    >
     <Circle
        data-name="Ellipse 90"
        cx={25.848}
        cy={25.848}
        r={25.848}
        fill="#fff9df"
      />
      <Text
        data-name={2}
        transform="translate(24.401 35.348)"
        fill="#16572c"
        fontSize={27}
        fontFamily="Montserrat-Black, Montserrat"
        fontWeight={800}
      >
        <TSpan x={-17.415} y={0}>
          {"02"}
        </TSpan>
      </Text>
    </Svg>

);

export default SVGIcon;
