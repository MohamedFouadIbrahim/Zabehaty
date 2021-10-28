
import * as React from 'react'

import ReferFriendsAR from "./ReferFriendsAR"
import ReferFriendsEN from "./ReferFriendsEN"
import Circle1 from "./Circle1"
import Circle2 from "./Circle2"
import Circle3 from "./Circle3"



export type Props = {
    source: "ReferFriendsEN" | "ReferFriendsAR" | "Circle1" | "Circle2" | "Circle3"
    ,
    width?: Number,
    height?: Number,
    color?: String,
    rotateDegree?: Number,
    opacity?: Number,
    style?: Object,
    selected: Boolean
}

function SVG(props: Props) {
    switch (props.source) {
        case 'ReferFriendsEN':
            return <ReferFriendsEN params={props} />;
        case 'ReferFriendsAR':
            return <ReferFriendsAR params={props} />;
        case 'Circle1':
            return <Circle1 params={props} />;
        case 'Circle2':
            return <Circle2 params={props} />;
        case 'Circle3':
            return <Circle3 params={props} />;
        default:
            return null;
    }
}

export default SVG;
