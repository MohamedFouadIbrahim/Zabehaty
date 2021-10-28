import React from "react";
import Svg, { G, Path, Rect, Text, TSpan } from "react-native-svg"
import { h, w } from '../../mutils';

const SVGIcon = props => (
    <Svg
        width={props.params.width ? w(props.params.width) : w(16)}
        height={props.params.height ? h(props.params.height) : h(16)}
        style={[{ transform: [{ rotate: (props.params.rotateDegree ? props.params.rotateDegree : 0) + 'deg' }] }, props.params.style]}
        viewBox="0 0 189.798 252.4"
        {...props}
    >
        <G data-name="Group 9847">
            <G data-name="Group 9828">
                <Path
                    data-name="Path 18934"
                    d="M99.225 117.407c1.522-12.03 4.672-43.791 3.109-49.886s-7.782-26.813-9.972-32.344-3.906-15.6-3.808-29.295c.018-2.443-.041-4.522-.9-5.882C61.646 1.585-.003 36.047-.003 36.047v91.752c6.471 8.472 26.914 20.83 37.367 24.4s11.654 8.944 11.654 8.944l49.945-31.16s.084-.237.234-.673c-.441-.764-1.059-3.319.028-11.903z"
                    fill="#ffcfba"
                    stroke="#de8e7c"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.372}
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(33.336 55.475)"
                />
            </G>
            <G data-name="Group 9829">
                <Path
                    data-name="Path 18935"
                    d="M443.824 539.682l-55.134 6.348a36.709 36.709 0 01-5.023-5.152v-10.334z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(33.335 172.94) translate(-383.668 -530.544)"
                    fill="#de8e7c"
                />
            </G>
            <G data-name="Group 9831">
                <Rect
                    data-name="Rectangle 531"
                    width={94.192}
                    height={183.274}
                    rx={9.134}
                    fill="#f1f2f2"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(9.443)"
                />
                <G data-name="Group 9830">
                    <Path
                        data-name="Path 18936"
                        d="M447.573 427.265h-63.93a13.294 13.294 0 00-13.279 13.279v153.011a13.5 13.5 0 0013.279 13.522h63.93a13.5 13.5 0 0013.279-13.522V440.544a13.294 13.294 0 00-13.279-13.279zm9.378 167.087a9.111 9.111 0 01-9.111 9.109h-64.515a9.109 9.109 0 01-9.109-9.109V440.166a9.11 9.11 0 019.109-9.109h7.567a1.61 1.61 0 011.61 1.61v.192a4.81 4.81 0 004.811 4.811h36.54a4.81 4.81 0 004.811-4.811v-.192a1.61 1.61 0 011.61-1.61h7.565a9.111 9.111 0 019.111 9.109z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(9.443) translate(1.852 1.852) translate(-370.364 -427.265)"
                        fill="#58595b"
                    />
                </G>
            </G>
            <G data-name="Group 9848">
                <Rect
                    data-name="Rectangle 532"
                    width={77.77}
                    height={31.018}
                    rx={1.852}
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(17.654 88.396) rotate(-180 38.885 15.509)"
                    fill="#16572c"
                />
            </G>
            <G data-name="Group 9849">
                <Rect
                    data-name="Rectangle 533"
                    width={77.77}
                    height={31.018}
                    rx={1.852}
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(17.654 121.395) rotate(-180 38.885 15.509)"
                    fill="#fff9df"
                />
            </G>
            <Text
                transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(57.271 107.587)"
                fill="#fff"
                fontSize={10}
                fontFamily="SegoeUI, Segoe UI"
            >
                <TSpan x={-8.767} y={0}>
                    {"\u0631\u0634\u062D"}
                </TSpan>
            </Text>
            <Text
                transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(57.271 140.086)"
                fill="#16572c"
                fontSize={10}
                fontFamily="SegoeUI, Segoe UI"
            >
                <TSpan x={-7.932} y={0}>
                    {"\u0625\u0631\u0628\u062D"}
                </TSpan>
            </Text>
            <G
                data-name="Group 9836"
                fill="#ffcfba"
                stroke="#de8e7c"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={1.372}
            >
                <Path
                    data-name="Path 18937"
                    d="M20.233 80.731l-8.949-1.168c-5.634-.81-12.154-3.659-8.77-11.719 3.323-7.912 6.085-9.58 11.719-8.768l8.945 1.166c3.161.466 9.58 6.085 8.77 11.719h0a10.38 10.38 0 01-11.715 8.77z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(0 76.817)"
                />
                <Path
                    data-name="Path 18938"
                    d="M17.985 21.514l-7.112-.9c-4.478-.644-9.6-3.293-6.666-11.417C7.091 1.222 9.344-.519 13.822.126l7.112.9c2.513.373 7.478 5.781 6.668 11.417h0c-.812 5.633-5.139 9.715-9.617 9.071z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(0 76.817)"
                />
                <Path
                    data-name="Path 18939"
                    d="M27.209 66.145l-17.51-2.52c-5.634-.81-12.153-3.659-8.768-11.718 3.323-7.912 6.083-9.58 11.717-8.768l17.51 2.52c3.162.466 9.58 6.083 8.77 11.718h0a10.379 10.379 0 01-11.719 8.768z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(0 76.817)"
                />
                <Path
                    data-name="Path 18940"
                    d="M28.797 45.391l-17.51-2.52c-5.634-.812-12.154-3.661-8.77-11.719 3.323-7.913 6.085-9.582 11.719-8.77l17.51 2.52c3.161.465 9.58 6.085 8.77 11.719h0a10.382 10.382 0 01-11.719 8.77z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(0 76.817)"
                />
            </G>
            <G data-name="Group 9837">
                <Path
                    data-name="Path 18941"
                    d="M46.241 131.374s-1.827-.189-.3-12.221 4.672-43.791 3.109-49.886-7.782-26.813-9.972-32.344-3.914-15.598-3.814-29.294c.03-4.234-.154-7.387-4.345-7.562-4.67-.194-12.169-.757-14.964 11.869-2.016 9.1-.616 19.769 1.908 26.8s4.141 10.559 2.891 14.6-12.666 15.37-17.886 32.5c-9.116 29.9 6.558 40.142 4.681 47.517"
                    fill="#ffcfba"
                    stroke="#de8e7c"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.372}
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(86.622 53.729)"
                />
            </G>
            <G data-name="Group 9841">
                <G data-name="Group 9838">
                    <Path
                        data-name="Rectangle 536"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) matrix(.849 -.529 .529 .849 0 42.68)"
                        fill="#f1f2f2"
                        d="M0 0H80.661V17.706H0z"
                    />
                </G>
                <G data-name="Group 9839">
                    <Path
                        data-name="Path 18942"
                        d="M450.2 548.68a4.076 4.076 0 10-5.71.79 4.076 4.076 0 005.71-.79z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-442.21 -542.061)"
                        fill="#bcbec0"
                    />
                    <Path
                        data-name="Path 18943"
                        d="M449.8 548.631a4.077 4.077 0 10-5.71.788 4.077 4.077 0 005.71-.788z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-442.473 -542.094)"
                        fill="#fff"
                    />
                    <Path
                        data-name="Path 18944"
                        d="M444.831 545.981a.5.5 0 10-.7.1.5.5 0 00.7-.1z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-441.516 -540.068)"
                        fill="#414042"
                    />
                    <Path
                        data-name="Path 18945"
                        d="M443.9 544.45a.5.5 0 10-.1-.7.5.5 0 00.1.7z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-441.664 -541.137)"
                        fill="#414042"
                    />
                    <Path
                        data-name="Path 18946"
                        d="M445.434 543.525a.5.5 0 10.7-.1.5.5 0 00-.7.1z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-440.596 -541.284)"
                        fill="#414042"
                    />
                    <Path
                        data-name="Path 18947"
                        d="M446.36 545.054a.5.5 0 10.1.7.5.5 0 00-.1-.7z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(61.478 9.985) translate(-440.448 -540.216)"
                        fill="#414042"
                    />
                </G>
                <Path
                    data-name="Path 18948"
                    d="M484.989 543.217l-5.087 3.174-24.59 15.341-43.842 27.351-1.137.71 7.463 11.891h104.127z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(-402.097 -531.371)"
                    fill="#205081"
                />
                <G data-name="Group 9840">
                    <Path
                        data-name="Path 18949"
                        d="M458.453 561.1a4.076 4.076 0 10-5.71.788 4.076 4.076 0 005.71-.788z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-450.461 -554.481)"
                        fill="#d1d3d4"
                    />
                    <Path
                        data-name="Path 18950"
                        d="M458.052 561.05a4.076 4.076 0 10-5.712.79 4.076 4.076 0 005.712-.79z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-450.725 -554.513)"
                    />
                    <Path
                        data-name="Path 18951"
                        d="M453.083 558.4a.5.5 0 10-.7.1.5.5 0 00.7-.1z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-449.768 -552.488)"
                        fill="#808285"
                    />
                    <Path
                        data-name="Path 18952"
                        d="M452.155 556.871a.5.5 0 10-.1-.7.5.5 0 00.1.7z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-449.916 -553.556)"
                        fill="#808285"
                    />
                    <Path
                        data-name="Path 18953"
                        d="M453.686 555.943a.5.5 0 10.7-.1.5.5 0 00-.7.1z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-448.848 -553.704)"
                        fill="#808285"
                    />
                    <Path
                        data-name="Path 18954"
                        d="M454.612 557.474a.5.5 0 10.1.7.5.5 0 00-.1-.7z"
                        transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(69.271 182.088) translate(75.148 30.559) translate(-448.7 -552.636)"
                        fill="#808285"
                    />
                </G>
            </G>
            <G data-name="Group 9842">
                <Path
                    data-name="Path 18955"
                    d="M467.2 538.554l-49.947 31.155s-1.153-4.582-9.083-7.983c-.306-.131-.648-.222-.986-.353l59.792-23.964z"
                    transform="translate(-362.844 -426.147) translate(363.545 426.147) translate(72.29 184.312) translate(-407.184 -537.409)"
                    fill="#de8e7c"
                />
            </G>
        </G>
    </Svg>

);

export default SVGIcon;
