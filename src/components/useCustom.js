import { useState, useEffect } from "react"

let listeners = []
let state = {}

const setState = newState => {
  state = { ...newState }
  listeners.forEach(listener => {
    listener(state)
  })
}

const useCustom = () => {
  const newListener = useState()[1]
  useEffect(() => {
    listeners.push(newListener)
    console.log(listeners)
  }, [])
  return [state, setState]
}

export default useCustom
