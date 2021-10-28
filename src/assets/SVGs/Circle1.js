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
        data-name="Ellipse 89"
        cx={25.848}
        cy={25.848}
        r={25.848}
        fill="#16572c"
      />
      <Text
        data-name={1}
        transform="translate(24.706 35.348)"
        fill="#fff"
        fontSize={27}
        fontFamily="Montserrat-Black, Montserrat"
        fontWeight={800}
      >
        <TSpan x={-14.85} y={0}>
          {"01"}
        </TSpan>
      </Text>
    </Svg>

);

export default SVGIcon;
