import React from "react"
import { DiVim } from "react-icons/di"

export const Svg = ({ src, ...props }) => {
  if (src === "intsec") {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88">
        <path
          fill="#000000"
          fill-rule="evenodd"
          d="M29.42 29.41c.36-.36.58-.85.58-1.4V0h-4v26H0v4h28c.55 0 1.05-.22 1.41-.58h.01zm0 29.18c.36.36.58.86.58 1.4V88h-4V62H0v-4h28c.56 0 1.05.22 1.41.58zm29.16 0c-.36.36-.58.85-.58 1.4V88h4V62h26v-4H60c-.55 0-1.05.22-1.41.58h-.01zM62 26V0h-4v28c0 .55.22 1.05.58 1.41.37.37.86.59 1.41.59H88v-4H62zM18 36c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm16-26a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 58a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 78a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zM34 4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm-8 82a2 2 0 1 1 4 0v2h-4v-2zm0-68a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V18zM66 4a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm0 72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm-48 0a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm0-72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm24-4h4v2a2 2 0 1 1-4 0V0zm0 60a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V60zm14-24c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm-28-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM36 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 68a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-34a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-12a2 2 0 1 0 0 4 6 6 0 1 1 0 12 2 2 0 1 0 0 4 10 10 0 1 0 0-20zm-64 0a2 2 0 1 1 0 4 6 6 0 1 0 0 12 2 2 0 1 1 0 4 10 10 0 1 1 0-20zm56-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-48 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm24 32a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm36-36a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 44c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm56 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm8 24c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zM3 68c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm0-48c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm71 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm6 66a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 86a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-68A6 6 0 1 1 8 2a6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm36 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
      </svg>
    )
  }

  if (src === "dimonds") {
    return (
      <svg
        {...props}
        width="1440"
        height="1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-2"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="Desktop-HD" fill="#000">
            <g id="Group" transform="translate(-355 -252)">
              <path
                id="Triangle"
                className="shard"
                transform="rotate(-44 527.5 810.922)"
                d="M507.647 789.002l273.353.855-234.46 42.984L274 789.857z"
              />
              <path
                id="Triangle-Copy"
                className="shard"
                transform="rotate(-44 810.5 373.038)"
                d="M964.585 334.002L1064 412.073l-159.164-36.436L557 412.073z"
              />
              <path
                id="Triangle-Copy-3"
                className="shard"
                transform="rotate(-22 1187.695 767.017)"
                d="M1188.166 768.729L891.32 918.444l192.188-108.171L1484.07 615.59z"
              />
              <path
                id="Triangle-Copy-17"
                className="shard"
                transform="rotate(-22 1570.52 828.427)"
                d="M1570.99 830.139l-296.845 149.715 192.187-108.17L1866.896 677z"
              />
              <path
                id="Triangle-Copy-11"
                className="shard"
                transform="rotate(-22 1850.695 441.015)"
                d="M1851.166 442.727L1554.32 592.442l192.188-108.171 400.563-194.683z"
              />
              <path
                id="Triangle-Copy-8"
                className="shard"
                transform="rotate(-22 749.84 1105.015)"
                d="M750.31 1106.727l-296.845 149.715 192.187-108.171 400.564-194.683z"
              />
              <path
                id="Triangle-Copy-21"
                className="shard"
                transform="rotate(-22 610.84 528.015)"
                d="M611.31 529.727L314.466 679.442 506.652 571.27l400.564-194.683z"
              />
              <path
                id="Triangle-Copy-12"
                className="shard"
                transform="rotate(-22 1412.84 779.013)"
                d="M1413.31 780.724L1116.466 930.44l192.187-108.171 400.564-194.684z"
              />
              <path
                id="Triangle-Copy-18"
                className="shard"
                transform="rotate(-22 1795.665 840.423)"
                d="M1796.136 842.135L1499.289 991.85l192.188-108.171 400.563-194.683z"
              />
              <path
                id="Triangle-Copy-20"
                className="shard"
                transform="rotate(-22 995.375 1137.43)"
                d="M995.846 1139.141L699 1288.856l192.188-108.17 400.563-194.684z"
              />
              <path
                id="Triangle-Copy-6"
                className="shard"
                transform="rotate(-22 1142.375 490.43)"
                d="M1142.846 492.141L846 641.856l192.188-108.17 400.563-194.684z"
              />
              <path
                className="shard"
                transform="rotate(-22 704.52 828.427)"
                d="M704.99 830.139L408.146 979.854l192.187-108.17L1000.896 677z"
              />
              <path
                id="Triangle-Copy-22"
                className="shard"
                transform="rotate(-22 332.375 664.43)"
                d="M332.846 666.141L36 815.856l192.188-108.17L628.75 513.001z"
              />
              <path
                id="Triangle-Copy-13"
                className="shard"
                transform="rotate(-22 1367.52 502.425)"
                d="M1367.99 504.137l-296.845 149.715 192.187-108.171 400.564-194.683z"
              />
              <path
                id="Triangle-Copy-7"
                className="shard"
                transform="rotate(-22 1020.375 577.43)"
                d="M1020.846 579.141L724 728.856l192.188-108.17 400.563-194.684z"
              />
              <path
                id="Triangle-Copy-14"
                className="shard"
                transform="rotate(-22 1683.375 251.427)"
                d="M1683.846 253.139L1387 402.854l192.188-108.17L1979.75 100z"
              />
              <path
                id="Triangle-Copy-10"
                className="shard"
                transform="rotate(-22 582.52 915.427)"
                d="M582.99 917.139l-296.845 149.715 192.187-108.17L878.896 764z"
              />
              <path
                id="Triangle-Copy-23"
                className="shard"
                transform="rotate(-22 486.375 355.43)"
                d="M486.846 357.141L190 506.856l192.188-108.17L782.75 204.001z"
              />
              <path
                id="Triangle-Copy-15"
                className="shard"
                transform="rotate(-22 1245.52 589.425)"
                d="M1245.99 591.137L949.146 740.852l192.187-108.171 400.564-194.683z"
              />
              <path
                id="Triangle-Copy-5"
                className="shard"
                transform="rotate(-87 1272.366 1096.101)"
                d="M1148.616 999.186l99.414 78.071 148.086 115.76-195.945-144.044z"
              />
              <path
                id="Triangle-Copy-19"
                className="shard"
                transform="rotate(-87 1655.19 1157.511)"
                d="M1531.44 1060.596l99.415 78.071 148.086 115.76-195.945-144.044z"
              />
              <path
                id="Triangle-Copy-4"
                className="shard"
                transform="rotate(-44 837.389 898.369)"
                d="M963.177 878.455l9.722 9.389-191.196 30.439-79.825-5.62z"
              />
              <path
                id="Triangle-Copy-16"
                className="shard"
                transform="rotate(-44 1500.389 572.367)"
                d="M1626.177 552.453l9.722 9.389-191.196 30.438-79.825-5.619z"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  } else {
    return <div />
  }
}
