import React, { useEffect } from "react"
import styled from "styled-components"
import { position } from "styled-system"
import Arizona from "../../static/arizona"
import { useObserver, buildThresholdList } from "../util"
import { useSprings, animated } from "react-spring"

const Styles = animated(styled.div`
  color: black;
  position: absolute;
  top: 130vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  p {
    margin: 0;
    max-width: 500px;
    flex-basis: 60%;
    align-self: center;
    @media (max-width: 600px) {
      flex-basis: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      background-color: #faebd7bf;
      backdrop-filter: blur(3px);
    }
  }

  .AZ_Wrapper {
    position: absolute;
    top: 40%;
    left: 77vw;
  }
  .Work_Caption {
    width: 100%;
    display: flex;
    height: 50%;
    justify-content: center;
  }
`)
const Portrait = styled.div`
  width: 100%;
  height: 100%;
  background: url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1573081599/ryansWebsite/ryansWebsite_Selfi_B_W_Center-removebg-preview.png");
  background-size: cover;
  background-position: center;
  max-width: 30vw;

  @media (max-width: 600px) {
    position: absolute;
    z-index: -1;
  }
`
export const SubCaption = () => {
  const [ref, entries] = useObserver({ threshold: buildThresholdList(40) })

  const [anim, setAnim] = useSprings(3, () => {
    return {
      opacity: [0],
      slide: [0],
      scale: [1, 0, 0],
    }
  })

  useEffect(() => {
    if (entries.intersectionRatio) {
      const ir = entries.intersectionRatio
      setAnim({
        opacity: ir,
        slide: 200 * ir,
        scale: [ir + 4.5, 0, 0],
      })
    }
  }, [entries])

  return (
    <>
      <Styles
        style={{ opacity: anim[0].opacity.interpolate(o => o) }}
        ref={ref}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <animated.div
            className="AZ_Wrapper"
            style={{
              transform: anim[1].scale.interpolate(
                (s, x, y) => `scale(${s}) translate(${x}px,${y}px)`
              ),
            }}
          >
            <Arizona />
          </animated.div>
          <animated.div className="Work_Caption">
            {/* <Portrait /> */}

            <p>Currently building digital products in Tempe Arizona.</p>
          </animated.div>
        </div>
      </Styles>
    </>
  )
}
