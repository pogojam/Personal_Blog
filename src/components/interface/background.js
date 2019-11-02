import React, { useRef, useLayoutEffect } from "react"
import { getDistance } from "../util"

const initCanvas = ref => {
  // canvas context
  const canvas = ref.current
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  const c = canvas.getContext("2d", { alpha: false })

  // window variables
  var innerWidth = window.innerWidth
  var innerHeight = window.innerHeight
  // Mouse
  var mouse = {
    x: null,
    y: null,
  }
  document.addEventListener("mousemove", event => {
    mouse.x = event.x
    mouse.y = event.y
  })

  // scroll
  let polarity = "down"
  let scrollRatio
  let containerHeight = document
    .getElementById("MainContainer")
    .getBoundingClientRect().height

  document.addEventListener("scroll", event => {
    if (scrollRatio < window.pageYOffset / (containerHeight - innerHeight)) {
      polarity = "down"
    }
    if (scrollRatio > window.pageYOffset / (containerHeight - innerHeight)) {
      polarity = "up"
    }

    scrollRatio = window.pageYOffset / (containerHeight - innerHeight)
  })

  let maxBubble = 100
  let bubbleCount = Math.floor(scrollRatio * maxBubble)

  const updateScrollBubble = () => {
    if (bubbleCount != Math.floor(scrollRatio * maxBubble)) {
      if (polarity === "up") {
        BubbleArray.length = bubbleCount
      }
      if (polarity === "down") {
        for (let i = BubbleArray.length; i < bubbleCount; i++) {
          let x = Math.random() * innerWidth
          let y = innerHeight
          const radius = 20 * Math.random()
          const colorArray = ["#027495", "#01a9c1", "#bad6db"]
          const color = colorArray[Math.floor(Math.random() * 3)]

          BubbleArray.push(new Bubble(x, y, radius, color))
        }
      }
    }
    bubbleCount = Math.floor(scrollRatio * maxBubble)
  }

  // shapes

  const Bubble = function(x, y, radius, color) {
    this.color = color
    this.radius = radius
    this.x = x
    this.y = y

    let lift = -(Math.random() * 10) + 3

    this.dx = 0
    this.dy = 0

    this.update = () => {
      if (this.y < 0) {
        this.y = innerHeight
        this.x = Math.random() * innerWidth
        this.dy = -Math.random() * 5
      }
      // Mouse Interaction
      if (getDistance(this.x, this.y, mouse.x, mouse.y) < 100) {
        this.x > mouse.x ? (this.dx = 1) : (this.dx = -1)
      }

      // Container Interaction

      // add velocitys
      this.y += this.dy
      this.x += this.dx
      // upward gravity
      this.y += lift
      // Draw Shape
      this.draw()
    }
    this.draw = () => {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
      c.fillStyle = color
      c.fill()
    }
  }

  const initBubbles = 40
  let BubbleArray = []

  // inital bubbles

  const initShapes = () => {
    // add shapes
    // push shapes into array
    for (let i = 0; i < initBubbles; i++) {
      // positon
      let x = Math.random() * innerWidth
      let y = Math.random() * innerHeight
      const radius = 10 * Math.random()
      const colorArray = ["#027495", "#01a9c1", "#bad6db"]
      const color = colorArray[Math.floor(Math.random() * 3)]

      BubbleArray.push(new Bubble(x, y, radius, color))
    }
  }

  initShapes()

  const animate = () => {
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, innerWidth, innerHeight)
    // updateScrollBubble()
    BubbleArray.forEach(Bubble => Bubble.update())
  }

  animate()
}

const Background = () => {
  const canvasRef = useRef()
  useLayoutEffect(() => {
    console.log(canvasRef)
    initCanvas(canvasRef)
  })

  return (
    <canvas style={{ position: "fixed", left: 0, top: 0 }} ref={canvasRef} />
  )
}

export default Background
