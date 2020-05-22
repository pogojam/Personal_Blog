import React from "react"

export const Logo = ({ invert, ...props }) => {
  return (
    <svg
      {...props}
      width="90px"
      height="90px"
      viewBox="0 0 90 90"
      version="1.1"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          style={{
            transition: "fill .4s linear",
          }}
          id="Rectangle-2"
          fill={invert ? "white" : "black"}
        >
          <rect
            id="Rectangle"
            x="0"
            y="0"
            width="90"
            height="90"
            rx="27"
          ></rect>
        </g>
        <g
          id="Group-4"
          transform="translate(12.000000, -3.000000)"
          fill={invert ? "black" : "white"}
          style={{
            transition: "fill .4s linear",
          }}
          fontFamily="PoiretOne-Regular, Poiret One"
          fontSize="83"
          fontWeight="normal"
        >
          <g id="Group">
            <text id="R-Copy">
              <tspan x="33" y="80">
                R
              </tspan>
            </text>
            <text
              id="B-Copy"
              transform="translate(16.500000, 48.500000) scale(-1, 1) translate(-16.500000, -48.500000) "
            >
              <tspan x="0" y="80">
                B
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}
