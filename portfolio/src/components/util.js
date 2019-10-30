import React, { useEffect, useRef, useState } from "react"

export const pipe = input => (...args) =>
  args.reduce((acc, func) => func(acc), input)

export const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

export const useObserver = ({ root = null, rootMargin, threshold = 0 }) => {
  const [entry, updateEntry] = useState({})
  const [node, setNode] = useState(null)
  const isWindow = typeof window !== `undefined`

  const observer = isWindow? useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold,
    })
  ):null

  useEffect(() => {
    const { current: currentObserver } = observer
    currentObserver.disconnect()

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node])

  return [setNode, entry]
}

export const useSceanState = state => {
  const [list, setList] = useState([])
  const [current, setCurrentScean] = useState(null)

  useEffect(() => {
    state && setList(state)
  }, [])

  const setScean = input => {
    setCurrentScean(input)
  }

  return [setScean, current]
}
