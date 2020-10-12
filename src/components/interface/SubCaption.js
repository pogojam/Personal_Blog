import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { position } from "styled-system"
import Arizona from "../../static/arizona"
import { useObserver, buildThresholdList} from "../util"
import { useSprings, useTransition, animated } from "react-spring"
import { useWindowSize } from "@react-hook/window-size"

const Styles = animated(styled.div`
  color: white;
  position: absolute;
  top: ${({windowHeight})=>windowHeight * 1.5 +"px"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({windowHeight})=>windowHeight * 1 +"px"};

  p {
    margin: 0;
    flex-basis: 60%;
    align-self: center;
    font-size: 2em;
    line-height: 42px;
    @media (max-width: 600px) {
      flex-basis: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      /* background-color: #faebd7bf; */
      backdrop-filter: blur(3px);
    }
  }

  .AZ_Wrapper {
    position: absolute;
    top: 40%;
    left: 16vw;
  }
  .Work_Caption {
    width: 100%;
    display: flex;
    height: 50%;
    align-self: center;
    justify-content: center;
    position: relative;
    border-radius:56px;
    overflow:hidden;
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
const AzBackground = ({isMobile}) => {
  return (
<>
{ 
!isMobile &&    <div
      style={{
        background: ` linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ),url(https://res.cloudinary.com/dxjse9tsv/image/upload/v1537298666/Portfolio/glen-canyon.jpg)`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
      }}
    />
 }
</>
  )
}

export const SubCaption = ({isMobile}) => {
  const [ref, entries] = useObserver({ threshold: buildThresholdList(40) })
  const [showBackground, setBackground] = useState(false)
  const [windowWidth,windowHeight] = useWindowSize()

  const transition = useTransition(showBackground, null, {
    from: {
      opacity: .3,
      transform: [0.7, 30],
    },
    enter: {
      opacity: 1,

      transform: [1, 0],
    },
    leave: {
      opacity: .3,
      transform: [0, -30],
    },
    config: { tension: 500, friction: 30 },
  })
  const [anim, setAnim] = useSprings(3, () => {
    return {
      opacity: [0],
      slide: [0],
      scale: [1, 0, 0],
    }
  })

  useEffect(() => {
    const breakPoint = 0.6
    const maxScale = isMobile ?2.4:4
    const xMax =  isMobile ? 20 :0

    if (entries.intersectionRatio) {
      const ir = entries.intersectionRatio
      setAnim({
        opacity: ir,
        slide: 200 * ir,
        scale: [ir + maxScale, xMax, 0],
      })
      if (ir > breakPoint && !showBackground) {
        setBackground(true)
      }
      if (ir < breakPoint && showBackground) {
        setBackground(false)
      }
    }
  }, [entries])

  return (
    <>
      <Styles
      windowHeight={windowHeight}
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
                (s, x, y) => `scale(${s}) translate(${x}%,${y}px)`
              ),
            }}
          >
            <Arizona />
          </animated.div>
          <div className="Work_Caption">
            {/* <Portrait /> */}
            {transition.map(({ item, key, props }) => {
              return (
                <animated.div
                  style={{
                    ...props,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                >
                  {item && <AzBackground isMobile={isMobile}  />}
                </animated.div>
              )
            })}

            {/* <animated.div
              style={{
                display: "flex",
                transform: anim[0].slide.interpolate(x => `translate(${x})`),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Building digital products in Tempe Arizona.</p>
            </animated.div> */}
          </div>
        </div>
      </Styles>
    </>
  )
}
